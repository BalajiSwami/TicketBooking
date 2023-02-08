const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Movies = mongoose.Schema({
    movie_id: String,
    name: String,
    realse_date: String,
    amount: Number,
    shows: Object,
    rating : Number
})
Movies.plugin(timestamp)
var movie = mongoose.model("Movies", Movies)

this.getmovie = function () {
    return movie;
}