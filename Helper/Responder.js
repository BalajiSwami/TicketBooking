function Responder(){

    this.sendSuccessMessage = function(message,res){
        var result = {}
        res.setHeader('Content-Type','application/json')
        result.success = true
        result.message = message
        res.end(JSON.stringify(result))
    }

    this.sendSuccessData = function(message,data,res){
        var result = {}
        res.setHeader('content-type','application/json')
        result.success = true
        result.message = message
        result.data = data
        res.end(JSON.stringify(result))
    }

    this.sendFailureMessage = function(message,res){
        var result = {}
        res.setHeader('content-type','application/json')
        result.success = false
        result.message = message
        res.end(JSON.stringify(result))
    }
}

module.exports = new Responder()