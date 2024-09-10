require('express')
const Responder = require('../../Helper/Responder')
const Utills = require('../../Helper/Utils')
const Rating = require('../../Database/Ratingschema').getRating()
const User = require('../../Database/Userschema').getUser()
const Booking = require('../../Database/Bookinschema').getbooking()
const Movie = require('../../Database/Movieschema').getmovie()

function Controller() {

    this.createratting = async function (req, res) {
        var data = req.body
        var movieId = req.params.movie_id
        let headers = req.headers['x-consumer-username']
        let username = headers ? headers.split('_')[1] : null

        if (!data || !data.rating)
            Responder.sendFailureMessage("Invalid input", res)

        var finduser = await Booking.findOne({ user_id: username })
        if (!finduser) Responder.sendFailureMessage("Booking Users only give ratiing", res)

        var getname = await User.findOne({ user_id: username })
        var name = getname.name

        data["rating_id"] = Utills.Shortid()
        data["movie_id"] = movieId
        data["name"] = name
        data["user_id"] = username
        var rating = await Rating.create(data)
        if (rating) {
            Responder.sendSuccessData("Ratting", { rating }, res)
            var count = [
                { $match: { movie_id: movieId } },
                {
                    $group: {
                        _id: 0,
                        avgRating: { $avg: "$rating" }
                    }
                }
            ]
            Rating.aggregate(count, (err, rate) => {
                if (rate) {
                    Movie.findOneAndUpdate({ movie_id: movieId }, { rating: rate[0].avgRating }, { new: true }, (err, update) => {
                    })
                }
                else Responder.sendFailureMessage("Can not find average", res)
            })
        }
        else Responder.sendFailureMessage("Can not create ratting", res)
    }

    this.deleteratting = async function (req, res) {
        var rattingId = req.params.ratting_id
        Rating.findOneAndRemove({ ratting_id: rattingId }, (err, rate) => {
            if (rate) return Responder.sendSuccessMessage("Ratting deleted successfully", res)
            else Responder.sendFailureMessage("Can not delete ratting", res)
        })
    }

    this.deleteall = async function (req, res) {
        Rating.deleteMany({}, (err, rate) => {
            if (rate) return Responder.sendSuccessMessage("All ratting deleted successfully", res)
            else Responder.sendFailureMessage("Can not delete ratting", res)
        })
    }
}

module.exports = new Controller()