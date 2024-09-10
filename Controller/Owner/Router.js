const Express = require('express')
const Controller = require('../../Controller/Owner/Controller')
const app = Express()

app.post('/create',(req,res)=>{
    Controller.createowner(req,res)
})

app.post('/login',(req,res)=>{
    Controller.login(req,res)
})

app.get('/',(req,res)=>{
    Controller.findowners(req,res)
})

app.delete('/:owner_id',(req,res)=>{
    Controller.deletewoner(req,res)
})
module.exports = app;