require('express')
const Movies = require('../../Database/Movieschema').getmovie();
const Owner = require('../../Database/Ownerschema').getowner();
const Responder = require('../../Helper/Responder')
const Utills = require('../../Helper/Utils')
require('mongoose-pagination')
const rating = require('../../Database/Ratingschema')

function Controller() {

    this.createmovie = async function (req, res) {
        var data = req.body
        let headers = req.headers['x-consumer-username']
        let username = headers ? headers.split('_')[1] : null;
        var shows = {
            show_1: { from: "10", to: "11" },
            show_2: { from: "11", to: "12" }
        }
        if (!data || !data.name || !data.realse_date || !data.amount)
            return Responder.sendFailureMessage("Enter valid inputs", res)

        var findowner = await Owner.findOne({ owner_id: username })
        if (!findowner) Responder.sendFailureMessage("Owner only craete a movie ", res)

        var checkmovie = await Movies.findOne({ name: data.name })
        if (checkmovie) return Responder.sendFailureMessage("This movie already exist", res)


        data["movie_id"] = Utills.Shortid()
        data["shows"] = shows
        var movie = await Movies.create(data)
        if (movie)
            return Responder.sendSuccessData("Movies", movie, res)
        else Responder.sendFailureMessage("Can not create movies", res)
    }

    this.searchmovie = async function (req, res) {
        var searchquery = {}
        var query = req.query
        var page = Utills.returnpage(query)
        var limit = Utills.returnlimit(query)
        if (query.key) {
            var searchfield = ["name"]
            var searchdata = []
            searchfield.forEach((name) => {
                var searchby = {}
                searchby[name] = { $regex: new RegExp(query.key.trim(), "i") }
                searchdata.push(searchby)
            })
            searchquery["$or"] = searchdata
        }
        Movies.find(searchquery).paginate(page, limit, (err, movies, total) => {
            if (movies)
                return Responder.sendSuccessData("Movies", { movies, total }, res)
            else Responder.sendFailureMessage("Can not find movies", res)
        })
    }

    this.deleteall = async function (req, res) {

        Movies.deleteMany({}, (err, message) => {
            if (message)
                return Responder.sendSuccessMessage("all movies deleted successfully", res)
            else Responder.sendFailureMessage("can not delete movies", res)
        })
    }
}

module.exports = new Controller();