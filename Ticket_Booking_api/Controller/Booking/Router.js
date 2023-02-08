const Express = require('express')
const Controller = require('../../Controller/Booking/Controller')
const app = Express()

app.post('/:movie_id/:screen_id',(req,res)=>{
    Controller.createbooking(req,res)
})

app.delete('/:booking_id',(req,res)=>{
    Controller.cancelbooking(req,res)
})

app.delete('/',(req,res)=>{
    Controller.delete(req,res)
})

module.exports = app;