const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Booking = mongoose.Schema({
    booking_id: String,
    amount: Number,
    user_id: String,
    seat: Number,
    movie: {
        movie_id: String,
        name: String
    },
    screen: {
        screen_id: String,
        name: String
    },
    status : {type:String,default:"booked"}

})

Booking.plugin(timestamp)
var booking = mongoose.model("Booking", Booking)

this.getbooking = function () {
    return booking;
}