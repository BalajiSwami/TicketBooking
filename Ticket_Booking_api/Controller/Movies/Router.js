const Express = require('express')
const Controller = require('../../Controller/Movies/Controller')
const app = Express()

app.post('/create',(req,res)=>{
    Controller.createmovie(req,res)
})

app.get('/',(req,res)=>{
    Controller.searchmovie(req,res)
})

app.delete('/',(req,res)=>{
    Controller.deleteall(req,res)
})

module.exports = app;