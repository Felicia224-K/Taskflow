const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.use(authenticate);

router.get('/', getAllProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;