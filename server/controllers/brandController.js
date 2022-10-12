const { Brand } = require("../models/models");
const ApiError = require("../error/apiError");

class BrandControler {
  async create(req, res) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      ApiError(e);
    }
  }

  async change(req, res) {
    const { name, id } = req.body;
    const brand = await Brand.findOne({ where: { id: id } });
    brand.name = name;
    await brand.save();
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Brand.destroy({
      where: { id },
    });
    return res.json(id);
  }
}

module.exports = new BrandControler();
