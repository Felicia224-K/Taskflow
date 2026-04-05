const { Project, Task } = require('../models');

exports.getDashboard = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userId: req.user.id },
    });

    const projectIds = projects.map(p => p.id);

    const tasks = await Task.findAll({
      where: { userId: req.user.id },
    });

    const stats = {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      archivedProjects: projects.filter(p => p.status === 'archived').length,
      totalTasks: tasks.length,
      todoTasks: tasks.filter(t => t.status === 'todo').length,
      inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
      doneTasks: tasks.filter(t => t.status === 'done').length,
      highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
    };

    res.json({ stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};