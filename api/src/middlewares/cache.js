const redis = require('../config/redis');

exports.cache = (duration) => async (req, res, next) => {
  const key = `cache:${req.user.id}:${req.originalUrl}`;
  try {
    const cached = await redis.get(key);
    if (cached) {
      return res.json({ ...JSON.parse(cached), fromCache: true });
    }
    res.sendResponse = res.json.bind(res);
    res.json = async (body) => {
      await redis.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  } catch (err) {
    next();
  }
};

exports.invalidateCache = (pattern) => async (req, res, next) => {
  try {
    const keys = await redis.keys(`cache:${req.user.id}:${pattern}`);
    if (keys.length > 0) await redis.del(...keys);
  } catch (err) {
    console.error('Cache invalidation error:', err);
  }
  next();
};