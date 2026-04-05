const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { cache } = require('../middlewares/cache');
const { getDashboard } = require('../controllers/dashboardController');

router.get('/', authenticate, cache(30), getDashboard);

module.exports = router;