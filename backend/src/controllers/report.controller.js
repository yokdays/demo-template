// const service = require('../services/report.service');
// const { summaryQuery } = require('../validations/report.validation');

// exports.getSummary = async (req, res, next) => {
//   try {
//     const { error, value } = summaryQuery.validate(req.query);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }

//     const data = await service.getSummary(value);

//     res.json({
//       success: true,
//       data
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getSummary = async (req, res, next) => {
  try {
    res.json({ message: 'summary ok' });
  } catch (err) {
    next(err);
  }
};