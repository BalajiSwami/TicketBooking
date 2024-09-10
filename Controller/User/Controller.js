require('express')
const Responder = require('../../Helper/Responder')
const Utills = require('../../Helper/Utils')
const User = require('../../Database/Userschema').getUser()
const Rating = require('../../Database/Ratingschema').getRating()
const Booking = require('../../Database/Bookinschema').getbooking()
const async = require('async')

function Controller() {

    this.signup = async function (req, res) {
        var data = req.body
        if (!data || !data.name || !data.email || !data.password)
            return Responder.sendFailureMessage("Enter Invalid Inputs", res)

        if (!data.phone.national_number)
            return Responder.sendFailureMessage("Enter Valid Phone Number", res)

        var checkuser = await User.findOne({ "phone.national_number": data.phone.national_number, "phone.country_code": data.phone.country_code })
        if (checkuser) return Responder.sendFailureMessage("This user Already exist", res)
        else {
            data["user_id"] = Utills.Shortid()
            data["password"] = Utills.createhashpws(data.password)
            var user = await User.create(data)
            if (user)
                return Responder.sendSuccessData("User", user, res)
            else Responder.sendFailureMessage("Can not create new user", res)
        }

    }

    this.login = async function (req, res) {
        var data = req.body

        if (!data || !data.email || !data.password || !data.phone.national_number)
            return Responder.sendFailureMessage("Enter valid input", res)

        var checkuser = await User.findOne({ email: data.email, "national number": data.phone.national_number, "country code": data.phone.country_code, password: Utills.createhashpws(data.password) })
        if (checkuser)
            return Responder.sendSuccessMessage("Login successfully", res)
        else Responder.sendFailureMessage("Can not login try again", res)
    }

    this.dashboard = async function (req, res) {
        let headers = req.headers['x-consumer-username']
        let username = headers ? headers.split('_')[1] : null;

        var seatcount = [
            { $match: { user_id: username } },
            {
                $group: {
                    _id: null,
                    seat: { $sum: "$seat" },
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    total_seats: "$seat",
                    total: "$total"
                }
            }
        ]
        async.parallel({

            rating: function (callback) {
                Rating.countDocuments({ user_id: username }).exec(callback)
            },
            booking_booked: function (callback) {
                Booking.countDocuments({ user_id: username, status: "booked" }).exec(callback)
            },
            booking_cancel: function (callback) {
                Booking.countDocuments({ user_id: username, status: "cancelled" }).exec(callback)
            },
            count_seat: function (callback) {
                Booking.aggregate(seatcount).exec(callback)
            },
        }, function (err, result) {
            var resultobj = {}
            if (result.count_seat) {
                resultobj["count_seat"] = result.count_seat[0].total_seats
            }
            if (result.rating) {
                resultobj["rating"] = result.rating
            }
            if (result.booking_booked) {
                resultobj["booking_booked"] = result.booking_booked
            }
            if (result.booking_cancel) {
                resultobj["booking_cancel"] = result.booking_cancel
            }
            Responder.sendSuccessData("Dashboard", resultobj, res)
        })
    }

    this.deleteone = async function (req, res) {
        var userid = req.params.user_id
        User.findOneAndDelete({ userid }, (err, message) => {
            if (message)
                return Responder.sendSuccessMessage("User deleted successfully", res)
            else Responder.sendFailureMessage("Can not delete user", res)
        })
    }

    this.getuser = async function (req, res) {

        User.find({}, (err, user) => {
            console.log("coming::::::::")
            if (user) return Responder.sendSuccessData('Users', user, res)
            else Responder.sendFailureMessage("Can not find users", res)
        })
    }
}

module.exports = new Controller();