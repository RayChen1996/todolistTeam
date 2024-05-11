const Todos = require('./models/todo');
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");

/** - 指定id返回todos */
async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    successHandle(res, todo);
  } catch (error) {
    console.log(error);
    errorHandle(res);
  }
}

/** - 返回All todos */
async function getAllTodos(req, res) {
  try {
    const todos = await Todos.find();
    successHandle(res, todos);
  } catch (error) {
    console.log(error);
    errorHandle(res);
  }
}

/** - 限制一頁10筆 */
async function getTodosLimit(req, res, page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;
    const todos = await Todos.find().skip(skip).limit(limit);
    successHandle(res, todos);
  } catch (error) {
    console.log(error);
    errorHandle(res);
  }
}

// export { getTodoById, getAllTodos, getTodosLimit };

module.exports = { getTodoById, getAllTodos, getTodosLimit };
