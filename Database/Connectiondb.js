const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/Ticket_Booking'

function Connection(){

    this.connect = async function(){
        mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("DB CONNECTED....!")
    }
}

module.exports = new Connection()