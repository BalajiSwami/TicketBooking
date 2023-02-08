require('express')
const Screen = require('../../Database/Screenschema').getScreen()
const Responder = require('../../Helper/Responder')
const Utills = require('../../Helper/Utils')
const Owner = require('../../Database/Ownerschema').getowner()
const cron = require('node-cron')

function Controller() {

    var cronTask = cron.schedule('0 30 13 * * *', () => {
        console.log("Corn")
        this.updateseat()
    })
    cronTask.start();

    this.craete = async function (req, res) {
        var data = req.body
        let headers = req.headers['x-consumer-username']
        let username = headers ? headers.split('_')[1] : null;

        var findowner = await Owner.findOne({ owner_id: username })
        if (!findowner) Responder.sendFailureMessage("Owner only create a screen", res)

        data["screen_id"] = Utills.Shortid()
        var screen = await Screen.create(data)
        if (screen)
            return Responder.sendSuccessData("Screen", { screen }, res)
        else Responder.sendFailureMessage("Can not create screen", res)

    }

    this.deletescreen = async function (req, res) {
        Screen.deleteMany({}, (err, message) => {
            if (message) Responder.sendSuccessMessage("Screen deleted successfully", res)
            else Responder.sendFailureMessage("Can not delete screen ", res)
        })
    }

    this.getscreen = async function (req, res) {
        Screen.find({}, (err, screen) => {
            if (screen) return Responder.sendSuccessData("Screen", { screen }, res)
            else Responder.sendFailureMessage("Can not get screen", res)
        })
    }

    this.updateseat = async function (req, res) {
        Screen.find({}, (err, screen) => {
            screen.forEach((screens) => {
                var availableseat = 0
                availableseat = screens.total_seat
                Screen.findOneAndUpdate({ screen_id: screens.screen_id }, { available_seat: availableseat }, { new: true }, (err, updatescreen) => {
                    console.log("Updated seats")
                })
            })
        })
    }


}
module.exports = new Controller()