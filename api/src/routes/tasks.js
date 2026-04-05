const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { taskValidator, taskStatusValidator } = require('../middlewares/validators');


const {
  getProjectTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

router.use(authenticate);

router.get('/projects/:id/tasks', getProjectTasks);
router.post('/projects/:id/tasks', taskValidator, validate, createTask);
router.put('/tasks/:id', taskValidator, validate, updateTask);
router.patch('/tasks/:id/status', taskValidator, validate, updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;