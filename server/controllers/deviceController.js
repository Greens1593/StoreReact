const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/apiError");

class DeviceControler {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badReqest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devises;
    if (!brandId && !typeId) {
      devises = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devises = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devises = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devises = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(devises);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return res.json(device);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
    });
    await Device.destroy({
      where: { id },
    });
    await DeviceInfo.destroy({
      where: { deviceId: id },
    });
    fs.unlink(path.resolve(__dirname, "..", "static", device.img), (err) => {
      if (err) {
        return next(ApiError.badReqest(err));
      }
    });
    res.status(200).json({ id });
  }

  async change(req, res, next) {
    const { id, name, price, brandId, typeId, info } = req.body;
    const device = await Device.findOne({ where: { id: id } });
    device.name = name;
    device.price = price;
    device.brandId = brandId;
    device.typeId = typeId;

    if (req.files !== null) {
      const { img } = req.files;
      fs.unlink(path.resolve(__dirname, "..", "static", device.img), (err) => {
        if (err) {
          return next(ApiError.badReqest(err));
        }
      });
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      device.img = fileName;
    }

    await device.save();

    if (info) {
      await DeviceInfo.destroy({ where: { deviceId: id } });
      const newInfo = JSON.parse(info);
      newInfo.forEach(async (i) => {
        await DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: id,
        });
      });
    }
    return res.status(200).json(device);
  }

  estimate = async (req, res) => {
    const { deviceId, userId, rate } = req.body;
    const desiredDevice = await Device.findOne({ where: { deviceId } });
    if (desiredDevice.userId !== userId) {
      const newRate =
        (desiredDevice.rate * desiredDevice.count + rate) /
        (desiredDevice.count + 1);
      desiredDevice.rate = newRate;
      desiredDevice.count = desiredDevice.count + 1;
      res.json(newRate);
    } else res.json({ message: "Вы уже поставили оценку этому устройству" });
  };
}

module.exports = new DeviceControler();
