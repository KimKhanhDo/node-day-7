const express = require('express');
const taskController = require('@/controllers/task.controller');
const authRequired = require('@/middlewares/authRequired');

const router = express.Router();

// Client -> request -> controller -> model -> JSON response

// Public routes - Không cần auth (READ)
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

// Protected routes - CẦN auth (CREATE, UPDATE, DELETE)
router.post('/', authRequired, taskController.createTask);
router.put('/:id', authRequired, taskController.updateTask);
router.patch('/:id/toggle', authRequired, taskController.toggleTaskCompletion);
router.delete('/:id', authRequired, taskController.deleteTask);

module.exports = router;
