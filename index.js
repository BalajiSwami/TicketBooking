const Express = require('express')
const bodyParser = require('body-parser')
const app = Express()
const PORT = 9001
require('./Database/Connectiondb').connect()

app.use(bodyParser.json(
    {
        limit: "50mb"
    }
))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
}))
app.use('/', (req, res) => {
    console.log(':::::::::')
    res.send("balu")
})
app.use('/user', require('./Controller/User/Router'))
app.use('/owner', require('./Controller/Owner/Router'))
app.use('/movie', require('./Controller/Movies/Router'))
app.use('/book', require('./Controller/Booking/Router'))
app.use('/screen', require('./Controller/Screen/Router'))
app.use('/rating', require('./Controller/Rating/Router'))

app.listen(PORT, () => {
    console.log("PORT RUNNING....")
})