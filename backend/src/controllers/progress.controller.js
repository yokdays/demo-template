import { buildProgressResponse } from '../services/progress.service.js';

export async function getProgress(req, res, next) {
  try {
    const year = parseInt(req.query.year || new Date().getFullYear());

    const data = await buildProgressResponse(year);

    res.json(data);
  } catch (err) {
    next(err);
  }
}
