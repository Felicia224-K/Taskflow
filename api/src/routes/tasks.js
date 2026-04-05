const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  getProjectTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

router.use(authenticate);

router.get('/projects/:id/tasks', getProjectTasks);
router.post('/projects/:id/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id/status', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;