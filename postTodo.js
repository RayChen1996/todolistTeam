const Todos = require('./models/todo');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

const postTodo = async (res, req) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const title = JSON.parse(body)?.title;
      const newTodo = await Todos.create({ title });
      successHandle(res, newTodo);
    } catch (error) {
      errorHandle(res, error);
    }
  })
}

module.exports = postTodo;
