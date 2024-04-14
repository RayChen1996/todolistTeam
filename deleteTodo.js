const Todos = require("./models/todo");
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");

const deleteTodo = async (res, req = null) => {
  if (!req) {
    const todos = Todos.deleteMany({});
    successHandle(res, todos);
  } else {
    try {
      const id = req.url?.split("/")?.pop();
      const result = await Todos.findByIdAndDelete(id);

      successHandle(res, result);
    } catch (error) {
      errorHandle(res);
    }
  }
};

module.exports = deleteTodo;
