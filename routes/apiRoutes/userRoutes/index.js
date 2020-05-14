const router = require('express').Router();
const { addTodo, getUserTodos, getAllUserEmails, deleteUserTodoById, updateUserTodoById } = require('./../../../controllers/userController');

const { requireAuth } = require('./../../../middleware/authMiddleware');

router.route('/todos')
  .post(requireAuth, addTodo)
  .get(requireAuth, getUserTodos);
  
router.route('/todos/:todoId')
  .delete(requireAuth, deleteUserTodoById)
  .put(requireAuth, updateUserTodoById);

router.get('/emails', getAllUserEmails);

module.exports = router;