const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { taskValidator, taskStatusValidator } = require('../middlewares/validators');
const { cache, invalidateCache } = require('../middlewares/cache');


const {
  getProjectTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

router.use(authenticate);

router.get('/projects/:id/tasks', cache(60), getProjectTasks);
router.post('/projects/:id/tasks', taskValidator, validate, invalidateCache('/api/projects*'), createTask);
router.put('/tasks/:id', taskValidator, validate, invalidateCache('/api/projects*'), updateTask);
router.patch('/tasks/:id/status', taskStatusValidator, validate, invalidateCache('/api/projects*'), updateTaskStatus);
router.delete('/tasks/:id', invalidateCache('/api/projects*'), deleteTask);

module.exports = router;