import { getPool } from '../config/database.js';

const AGE_MAP = { 1: '15-24', 2: '25-34', 3: '35-44', 4: '45-54', 5: '55-64', 6: '65+' };

function genderKey(id) { return id === 1 ? 'male' : 'female'; }

function getRegionKey(id) {
    const pid = Number(id);

    // 1. กรุงเทพและปริมณฑล (BKK & Vicinity)
    const bkkIds = [1,2,3,4,5]; 
    if (bkkIds.includes(pid)) return 'bkk';

    // 2. ภาคเหนือ (North) - รหัสขึ้นต้นด้วย 5 หรือ 6
    if (pid >= 50 && pid <= 67) return 'north';

    // 3. ภาคตะวันออกเฉียงเหนือ (Northeast) - รหัสขึ้นต้นด้วย 3 หรือ 4
    if (pid >= 30 && pid <= 49) return 'northeast';

    // 4. ภาคใต้ (South) - รหัสขึ้นต้นด้วย 8 หรือ 9
    if (pid >= 80 && pid <= 96) return 'south';

    // 5. ภาคกลาง/ตะวันออก/ตะวันตก (Central/East/West) - รหัสอื่นๆ ที่เหลือ
    return 'central';
}

export async function buildProgressResponse(year) {
    const pool = await getPool();
    const reportYear = parseInt(year); // บังคับให้เป็น Integer

    const result = await pool.request()
        .input('year', reportYear)
        .query(`
            SELECT
                p.[province_id],
                p.province_name_th,
                s.age_range_id,
                s.gender_id,
                SUM(ISNULL(s.quota, 0))   AS quota,  -- ใช้ ISNULL ป้องกันค่า NULL
                SUM(ISNULL(s.success, 0)) AS success
            FROM [UAT].[dbo].[survey_statistics] AS s
                INNER JOIN [UAT].[dbo].[provinces] AS p ON s.province_id = p.province_id
            WHERE s.report_year = @year
            GROUP BY p.[province_id], p.province_name_th, s.age_range_id, s.gender_id
            ORDER BY p.[province_id] ASC;
        `);

    return transform(result.recordset);
}

function transform(rows) {
    const response = { summary: [], bkk: [], north: [], northeast: [], central: [], south: [] };
    const regionSummary = {};
    const regionMap = {};

    for (const r of rows) {
        const region = getRegionKey(r.province_id);
        const province = r.province_name_th;
        const age = AGE_MAP[r.age_range_id] || 'unknown';
        const gender = genderKey(r.gender_id);

        const q = Number(r.quota || 0);
        const s = Number(r.success || 0);

        // จัดโครงสร้าง Region -> Province
        regionMap[region] ??= {};
        regionMap[region][province] ??= { name: province, ageGroups: {} };

        const ag = regionMap[region][province].ageGroups;

        // 1. เก็บตามกลุ่มอายุ (15-24, 25-34...)
        ag[age] ??= baseNode();
        ag[age][gender].Quota += q;
        ag[age][gender].Success += s;
        ag[age].Quota += q;
        ag[age].Success += s;

        // 2. เก็บผลรวมของจังหวัด (total)
        ag.total ??= baseNode();
        ag.total[gender].Quota += q;
        ag.total[gender].Success += s;
        ag.total.Quota += q;
        ag.total.Success += s;

        // 3. เก็บผลรวมระดับภาค (Region Summary)
        regionSummary[region] ??= baseNode();
        regionSummary[region][gender].Quota += q;
        regionSummary[region][gender].Success += s;
        regionSummary[region].Quota += q;
        regionSummary[region].Success += s;
    }

    // ประกอบร่าง JSON ผลลัพธ์
    for (const region of Object.keys(response)) {
        if (region === 'summary') continue;
        
        // ใส่ข้อมูลรายจังหวัดลงในภาคนั้นๆ
        if (regionMap[region]) {
            response[region] = Object.values(regionMap[region]);
        }

        // สร้าง Summary รายภาค
        if (regionSummary[region]) {
            response.summary.push({
                name: regionName(region),
                ageGroups: { total: regionSummary[region] }
            });
        }
    }

    return response;
}

function baseNode() {
    return { 
        Quota: 0, 
        Success: 0, 
        male: { Quota: 0, Success: 0 }, 
        female: { Quota: 0, Success: 0 } 
    };
}

function regionName(code) {
    return {
        bkk: 'กรุงเทพและปริมณฑล',
        north: 'ภาคเหนือ',
        northeast: 'ภาคตะวันออกเฉียงเหนือ',
        central: 'ภาคกลาง/ตะวันออก/ตะวันตก',
        south: 'ภาคใต้'
    }[code] || code;
}