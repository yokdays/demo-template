const { sql, getPool } = require('../config/database');

exports.getSummary = async ({ year, gender }) => {
  const pool = await getPool();

  const result = await pool.request()
    .input('year', sql.Int, year)
    .input('gender', sql.VarChar, gender)
    .query(`
      SELECT
        p.province_name_th,
        a.age_code,
        SUM(s.quota) AS quota,
        SUM(s.success) AS success
      FROM survey_statistics s
      JOIN provinces p ON s.province_id = p.province_id
      JOIN age_ranges a ON s.age_range_id = a.age_range_id
      JOIN genders g ON s.gender_id = g.gender_id
      WHERE s.report_year = @year
      AND g.gender_code = @gender
      GROUP BY p.province_name_th, a.age_code
      ORDER BY p.province_name_th
    `);

  return result.recordset;
};