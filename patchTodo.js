const Todos = require('./models/todo.js');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

const patchTodo = async (res, req) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    }); 

    req.on('end', async () => {
        try {
            const id = req.url.split('/').pop();
            const title = JSON.parse(body).title;
            await Todos.findByIdAndUpdate(id, { title });
            const newTodo = { _id: id, title };
            successHandle(res, newTodo);
        }
        catch (error) {
            errorHandle(res, error);
        }
    });
}

module.exports = patchTodo;
