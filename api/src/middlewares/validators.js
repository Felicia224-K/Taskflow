const { body } = require('express-validator');

exports.registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.projectValidator = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('color').optional().isHexColor().withMessage('Color must be a valid hex color'),
  body('status').optional().isIn(['active', 'archived']).withMessage('Invalid status'),
];

exports.taskValidator = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('status').optional().isIn(['todo', 'in_progress', 'done']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
];

exports.taskStatusValidator = [
  body('status').isIn(['todo', 'in_progress', 'done']).withMessage('Invalid status value'),
];