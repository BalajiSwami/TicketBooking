const Express = require('express')
const Controller = require('../../Controller/Screen/Controller')
const app = Express()

app.post('/create',(req,res)=>{
    Controller.craete(req,res)
})

app.get('/',(req,res)=>{
    Controller.getscreen(req,res)
})

app.delete('/',(req,res)=>{
    Controller.deletescreen(req,res)
})

module.exports = app;