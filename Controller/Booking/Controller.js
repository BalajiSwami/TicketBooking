require('express')
const Booking = require('../../Database/Bookinschema').getbooking();
const User = require('../../Database/Userschema').getUser()
const Responder = require('../../Helper/Responder')
const Utills = require('../../Helper/Utils')
const Movie = require('../../Database/Movieschema').getmovie()
const Screen = require('../../Database/Screenschema').getScreen()


function Controller() {

    this.createbooking = async function (req, res) {
        var data = req.body
        var movie = req.params.movie_id
        var screen = req.params.screen_id
        let headers = req.headers['x-consumer-username']
        let username = headers ? headers.split('_')[1] : null;

        var finduser = await User.findOne({ user_id: username })
        if (!finduser) Responder.sendFailureMessage("User only Book the movies", res)

        var xmovie = await Movie.findOne({ movie_id: movie })
        var xscreen = await Screen.findOne({ screen_id: screen })
        var amount = xmovie.amount
        var amounts = amount * data.seat
        var seats = xscreen.available_seat - data.seat
        var date = new Date()

        if (xmovie.shows[data.booking_time.show].from === data.booking_time.from &&
            xmovie.shows[data.booking_time.show].to === data.booking_time.to
        ) {
            if (data.seat < xscreen.available_seat) {
                if (date >= new Date(xmovie.realse_date)) {
                    data["booking_id"] = Utills.Shortid()
                    data["movie.movie_id"] = movie
                    data["movie.name"] = xmovie.name
                    data["amount"] = amounts
                    data["user_id"] = username
                    data["screen.name"] = xscreen.name
                    data["screen.screen_id"] = screen
                    var booking = await Booking.create(data)
                    if (booking) {
                        Responder.sendSuccessData("Booking", booking, res)
                        Screen.findOneAndUpdate({ screen_id: screen }, { available_seat: seats }, { new: true }, (err, seat) => { })
                    }
                    else Responder.sendFailureMessage("Can not book the movie", res)
                } else return Responder.sendFailureMessage("movie not release ", res)
            } else return Responder.sendFailureMessage("Seat is not available", res)
        } else return Responder.sendFailureMessage("Enter the correct show time", res)

    }

    this.delete = async function (req, res) {
        Booking.deleteMany({}, (err, message) => {
            if (message)
                return Responder.sendSuccessMessage("Booking deleted successfully", res)
            else Responder.sendFailureMessage("Can not delete booking", res)
        })
    }

    this.cancelbooking = async function (req, res) {
        var bookingId = req.params.booking_id
        var booking = await Booking.findOne({ booking_id: bookingId })
        var seat = booking.seat
        var screenId = booking.screen.screen_id
        var xscreen = await Screen.findOne({ screen_id: screenId })
        var available = xscreen.available_seat
        var add = seat + available
        Booking.findOneAndUpdate({ booking_id: bookingId, status: "booked" }, { status: "cancelled" }, { new: true }, (err, message) => {
            if (message) {
                Responder.sendSuccessMessage("Booking cancelled successfully", res)
                Screen.findOneAndUpdate({ screen_id: screenId }, { available_seat: add }, { new: true }, () => { })
            }
            else Responder.sendFailureMessage("Can not cancel booking", res)
        })
    }
}

module.exports = new Controller();