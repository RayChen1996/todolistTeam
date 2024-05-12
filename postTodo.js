const Todos = require('./models/todo');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

/** - 新增 */
function postTodo(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const _title = JSON.parse(body)?.title;
      const _newTodo = await Todos.create({
        title: _title,
      });

      successHandle(res, _newTodo);
    } catch (error) {
      errorHandle(res);
    }
  });
}

module.exports = postTodo;
