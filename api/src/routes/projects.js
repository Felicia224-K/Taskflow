const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { projectValidator } = require('../middlewares/validators');


const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.use(authenticate);

router.get('/', getAllProjects);
router.post('/', projectValidator, validate, createProject);
router.get('/:id', getProject);
router.put('/:id', projectValidator, validate, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;