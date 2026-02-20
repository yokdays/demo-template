import { getPool } from '../config/database.js';

/**
 * Map age_range_id → label
 */
const AGE_MAP = {
  1: '15-24',
  2: '25-34',
  3: '35-44',
  4: '45-54',
  5: '55-64',
  6: '65+',
};

/**
 * Map gender_id → key
 */
function genderKey(id) {
  return id === 1 ? 'male' : 'female';
}

export async function buildProgressResponse(year) {
  const pool = await getPool();

  const result = await pool.request()
    .input('year', year)
    .query(`
      SELECT
        p.[province_id],
            p.province_name_th,
            s.age_range_id,
            s.gender_id,
            SUM(s.quota)   AS total_quota,
            SUM(s.success) AS total_success
      FROM [UAT].[dbo].[survey_statistics] AS s
        INNER JOIN [UAT].[dbo].[provinces] AS p ON s.province_id = p.province_id
      WHERE s.report_year = @year
      GROUP BY 
          p.[province_id],
          p.province_name_th, 
          s.age_range_id, 
          s.gender_id
      ORDER BY 
          p.[province_id] ASC, 
          p.province_name_th ASC, 
          s.age_range_id ASC;
      `);

  return transform(result.recordset);
}


function transform(rows) {
  const response = {
    summary: [],
    bkk: [],
    north: [],
    northeast: [],
    central: [],
    south: [],
  };

  const regionSummary = {};
  const regionMap = {};

  for (const r of rows) {
    const region = r.region_code;
    const province = r.province_name;
    const age = AGE_MAP[r.age_range_id];
    const gender = genderKey(r.gender_id);

    regionMap[region] ??= {};
    regionMap[region][province] ??= { name: province, ageGroups: {} };

    const ag = regionMap[region][province].ageGroups;

    ag[age] ??= baseNode();
    ag[age][gender].Quota += r.quota;
    ag[age][gender].Success += r.success;
    ag[age].Quota += r.quota;
    ag[age].Success += r.success;

    ag.total ??= baseNode();
    ag.total[gender].Quota += r.quota;
    ag.total[gender].Success += r.success;
    ag.total.Quota += r.quota;
    ag.total.Success += r.success;

    regionSummary[region] ??= baseNode();
    regionSummary[region][gender].Quota += r.quota;
    regionSummary[region][gender].Success += r.success;
    regionSummary[region].Quota += r.quota;
    regionSummary[region].Success += r.success;
  }

  for (const region of Object.keys(regionMap)) {
    response[region] = Object.values(regionMap[region]);

    response.summary.push({
      name: regionName(region),
      ageGroups: { total: regionSummary[region] },
    });
  }

  return response;
}

function baseNode() {
  return {
    Quota: 0,
    Success: 0,
    male: { Quota: 0, Success: 0 },
    female: { Quota: 0, Success: 0 },
  };
}

function regionName(code) {
  return {
    bkk: 'กรุงเทพและปริมณฑล',
    north: 'ภาคเหนือ',
    northeast: 'ภาคตะวันออกเฉียงเหนือ',
    central: 'ภาคกลาง/ตะวันออก/ตะวันตก',
    south: 'ภาคใต้',
  }[code];
}