const mongoose = require('mongoose')
const uri = 'mongodb+srv://balajis4580:gf08V9P8eigjC0jZ@ticketbooking.6g4lz.mongodb.net/'

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