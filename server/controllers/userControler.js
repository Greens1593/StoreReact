const ApiError = require("../error/apiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign({id: id, email, role}, 
        process.env.SEKRET_KEY,
        {expiresIn: '24h'})
}

class UserControler {
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badReqest('Unexpected email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badReqest('User with this email had alredy been registrated'))
        }
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({email, role, password: hashPassword})
        
        const basket = await Basket.create({userId: user.id})

        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
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