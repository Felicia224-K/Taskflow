const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { projectValidator } = require('../middlewares/validators');
const { cache, invalidateCache } = require('../middlewares/cache');


const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.use(authenticate);

router.get('/', cache(60), getAllProjects);
router.post('/', projectValidator, validate, invalidateCache('/api/projects*'), createProject);
router.get('/:id', getProject);
router.put('/:id', projectValidator, validate, invalidateCache('api/projects*'), updateProject);
router.delete('/:id', invalidateCache('/api/projects*'), deleteProject);

module.exports = router;