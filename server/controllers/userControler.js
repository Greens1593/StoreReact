const ApiError = require("../error/apiError")

class UserControler {
    async registration(req, res){

    }

    async login(req, res){
        
    }

    async check(req, res, next){
        const {id} = req.query
        
        if(!id){
            return next(ApiError.badReqest('Id is not defined'))
        }
        res.json(id)
    }
}

module.exports = new UserControler()