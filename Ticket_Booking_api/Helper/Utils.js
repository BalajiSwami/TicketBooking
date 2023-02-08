const Express = require('express')
const shortid = require('shortid')
const Crypto = require('crypto')

function Utills(){

    this.Shortid =  function(){
        return shortid.generate()
    }

    this.createhashpws =  function(input){
        return Crypto.createHash('md5').update(input).digest('hex')
    }

    this.returnpage = function(query){
        var page = 1
        if(query.page){
            page = query.page
        }
        return page
    }

    this.returnlimit = function(query){
        var limit = 5
        if(query.limit){
            limit = query.limit
        }
        return limit
    }
}

module.exports = new Utills()