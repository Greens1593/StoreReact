const { Type } = require("../models/models");
const ApiError = require("../error/apiError");

class TypeControler {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async change(req, res) {
    const { name, id } = req.body;
    const type = await Type.findOne({ where: { id: id } });
    type.name = name;
    await type.save();
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Type.destroy({
      where: { id },
    });
    return res.json(id);
  }
}

module.exports = new TypeControler();
