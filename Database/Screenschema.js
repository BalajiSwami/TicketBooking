const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Screen = mongoose.Schema({
    screen_id : String,
    name : String,
    total_seat : Number,
    available_seat : Number
})
Screen.plugin(timestamp)
var getScreen = mongoose.model("Screen",Screen)

this.getScreen = function(){
    return getScreen;
}