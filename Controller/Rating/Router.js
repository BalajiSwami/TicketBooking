const Express = require('express')
const Controller = require('./Controller')
const app = Express()

app.post('/rate/:movie_id', (req, res) => {
    Controller.createratting(req, res)
})
app.delete('/:rating_id',(req,res)=>{
    Controller.deleteratting(req,res)
})

app.delete('/',(req,res)=>{
    Controller.deleteall(req,res)
})

module.exports = app;