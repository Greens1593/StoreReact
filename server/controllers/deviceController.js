const uuid = require('uuid')
const path = require('path')
const { Device } = require('../models/models')
const ApiError = require('../error/apiError')

class DeviceControler {
    async create(req, res, next){
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
        }catch(e){
            next(ApiError.badReqest(e.message))
        }
    }

    async getAll(req, res){
        
    }

    async getOne(req, res){
        
    }
}

module.exports = new DeviceControler()