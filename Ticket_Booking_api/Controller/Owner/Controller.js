require('express')
const Responder = require('../../Helper/Responder')
const Utills = require('../../Helper/Utils')
const Owner = require('../../Database/Ownerschema').getowner();

function Controller(){

    this.createowner = async function(req,res){
    var data = req.body

    if(!data || !data.name || !data.email || !data.password || !data.phone.national_number || !data.phone.country_code)
    return Responder.sendFailureMessage("Enter valid inputs",res)

    var checkowner = await Owner.findOne({"phone.national_number ":data.phone.national_number ,"phone.country_code":data.phone.country_code})
    if(checkowner) { 
        Responder.sendFailureMessage("This owner already exist ",res)
    }else{
        data["owner_id"] = Utills.Shortid()
        data["password"] = Utills.createhashpws(data.password)
        var owner = await Owner.create(data)
        if(owner)
        return Responder.sendSuccessData("Owner",owner,res)
        else Responder.sendFailureMessage("Can not create owner",res)
    }
    }

    this.login = async function(req,res){

        var data = req.body

        if(!data || !data.email || !data.password || !data.phone.national_number || !data.phone.country_code)
        return Responder.sendFailureMessage("Enter valid input",res)

        var checkowner = await Owner.find({email : data.email,password:data.password,"phone.national_number":data.phone.national_number,"phone.country_code":data.phone.country_code})
        if(checkowner) return Responder.sendSuccessMessage("Login successfully",res)
        else Responder.sendFailureMessage("Login failed try again",res)
    }

    this.findowners = async function(req,res){

        Owner.find({},(err,owner)=>{
            if(owner)
            return Responder.sendSuccessData("Owners",owner,res)
            else Responder.sendFailureMessage("Can not find owners",res)
        })
    }

    this.deletewoner = async function(req,res){

        var data = req.params

        Owner.findOneAndDelete({owner_id:data.owner_id},(err,message)=>{
            if(message)
            return Responder.sendSuccessMessage("owner deleted successfully",res)
            else Responder.sendFailureMessage("Can not delete owner",res)
        })
    }
}

module.exports = new Controller()
