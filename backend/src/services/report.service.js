const repo = require('../repositories/report.repository');

exports.getSummary = async (params) => {
  const rows = await repo.getSummary(params);

  // แปลงเป็นโครงสร้างที่ frontend ใช้สะดวก
  const result = {};

  for (const r of rows) {
    if (!result[r.province_name_th]) {
      result[r.province_name_th] = {};
    }
    result[r.province_name_th][r.age_code] = {
      quota: r.quota,
      success: r.success
    };
  }

  return result;
};