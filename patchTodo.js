const Todos = require('./model/todo.js');
const mongoose = require('mongoose');

const mongoConstr='mongodb://localhost:27017/todo';

mongoose.connect(mongoConstr)
    .then(()=>{
        console.log('資料庫連線成功')
    })
    .catch((error)=>{
        console.log(error);
    });


function patchTodo(req, res) {
    let body = '';
    const id = req.url.split('/').pop();
    req.on('data', (chunk) => {
        body += chunk;
    }); 

    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const newTodo = await Todos.updateOne(
                { _id: id },
                { title: data.title}
            )
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "success",
                "message": `id:${id}更新成功`,
                Todo: newTodo
            }))
            res.end()


        }
        catch (error) {
            res.writeHead(400, headers);
            res.write(JSON.stringify({
                "status": "false",
                "message": "欄位異常，或沒有此 ID",
                "error": error
            }))
            res.end()
        }
    });
}

module.exports = patchTodo;