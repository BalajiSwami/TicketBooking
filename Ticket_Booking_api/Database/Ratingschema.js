const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Rating = mongoose.Schema({
    rating_id: String,
    movie_id: String,
    user_id: String,
    name : String,
    rating: Number
})
Rating.plugin(timestamp)
var ratting = mongoose.model("ratting", Rating)

this.getRating = function () {
    return ratting
}