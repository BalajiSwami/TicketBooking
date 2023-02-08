const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const User = mongoose.Schema({
    user_id : String,
    name : String,
    email : String,
    password : String,
    phone:{
        national_number : {type:String,required:true},
        country_code : {type:String,required:true}
    }
})
User.plugin(timestamp)
var user = mongoose.model("user",User)

this.getUser = function(){
    return user
}