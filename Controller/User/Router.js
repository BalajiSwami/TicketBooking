const Express = require('express')
const Controller = require('../../Controller/User/Controller')
const app = Express()

app.post('/signup',(req,res)=>{
    Controller.signup(req,res)
})

app.post('/login',(req,res)=>{
    Controller.login(req,res)
})

app.get('/dashboard',(req,res)=>{
    Controller.dashboard(req,res)
})

app.get('/',(req,res)=>{
    Controller.getuser(req,res)
})

app.delete('/:user_id',(req,res)=>{
    Controller.deleteone(req,res)
})

module.exports = app;