const { Task, Project } = require('../models');

exports.getProjectTasks = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const where = { projectId: req.params.id };
    if (req.query.status) where.status = req.query.status;
    if (req.query.priority) where.priority = req.query.priority;

    const tasks = await Task.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      projectId: req.params.id,
      userId: req.user.id,
    });
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, status, priority, dueDate } = req.body;
    await task.update({ title, description, status, priority, dueDate });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { status } = req.body;
    const validStatuses = ['todo', 'in_progress', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    await task.update({ status });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};