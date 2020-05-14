const { Todo, User } = require('./../models');

module.exports = {
  addTodo: async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Todo text cannot be blank'});
    }
    try {
      const newTodo = await new Todo({ text, user: req.user._id }).save();
      req.user.todos.push(newTodo);
      await req.user.save();
      return res.status(200).json(newTodo);
    } catch (e) {
      return res.status(403).json(e);
    }
  },

  getAllUserEmails: async (req, res) => {
    try {
      const users = await User.find({}, 'email')
      if (!users) {
        return res.status(404).json({ error: 'No users yet' });
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status(403).json(e);
    }
  },

  getUserTodos: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('todos');
      return res.status(200).json(user.todos);
    } catch (e) {
      return res.status(403).json(e);
    }
  },

  deleteUserTodoById: async (req, res) => {
    const { todoId } = req.params;
    console.log(req.user);
    try {
      const todoToDelete = await Todo.findById(todoId);
      if (!todoToDelete) {
        return res.status(404).json({ error: 'No todo with that id' });
      }
      if (req.user._id.toString() !== todoToDelete.user.toString()) {
        return res.status(401).json({ error: 'You cannot delete a todo that is not yours' });
      }
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      return res.status(200).json(deletedTodo);
    } catch (e) {
      return res.status(403).json(e);
    }
  },

  updateUserTodoById: async (req, res) => {
    const { todoId } = req.params;
    const { completed, text } = req.body;
    if (!text) {
      return res.status(401).json({ error: 'You must provide text' });
    }
    try {
      const todoToUpdate = await Todo.findById(todoId);
      if (!todoToUpdate) {
        return res.status(404).json({ error: 'No todo with that id' });
      }
      if (req.user._id.toString() !== todoToUpdate.user.toString()) {
        return res.status(401).json({ error: 'You cannot update a todo that is not yours' });
      }
      const updatedTodo = await Todo.findByIdAndUpdate(todoId, { text, completed }, { new: true });
      return res.status(200).json(updatedTodo);
    } catch (e) {
      return res.status(403).json(e);
    }
  }
}