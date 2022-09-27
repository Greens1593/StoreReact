const uuid = require('uuid')
const path = require('path')
const { Device } = require('../models/models')
const ApiError = require('../error/apiError')
const { where } = require('sequelize')

class DeviceControler {
    async create(req, res, next){
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            return res.json(device)
        }catch(e){
            next(ApiError.badReqest(e.message))
        }
    }

    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devises;
        if(!brandId && !typeId){
            devises = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devises = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devises = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId){
            devises = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset})
        }
        return res.json(devises)
    }

    async getOne(req, res){
        
    }
}

module.exports = new DeviceControler()