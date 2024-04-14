const Todos = require('./models/todo');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

const getTodo = async (res) => {
  try {
    const todos = await Todos.find();
    successHandle(res, todos);
  } catch (error) {
    errorHandle(res);
  }
}

module.exports = getTodo;
