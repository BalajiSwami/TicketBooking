const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Owners = mongoose.Schema({
    owner_id : String,
    name : String,
    email : String,
    password : String,
    phone : {
        national_number : {type:String,required:true},
        country_code : {type:String,required:true}
    }
})

Owners.plugin(timestamp)
let owner = mongoose.model("owners",Owners)

this.getowner = function(){
    return owner;
}