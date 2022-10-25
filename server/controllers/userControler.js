const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserControler {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badReqest("Unexpected email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badReqest("User with this email had alredy been registrated")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, role, password: hashPassword });

    const basket = await Basket.create({ userId: user.id });

    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User did not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Password is not correct"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async ratedDevices(req, res, next) {
    if (req.user.id) {
      const user = await User.findByPk(req.user.id);
      return res.json(user.ratedDevices);
    } else {
      return res.json(false);
    }
  }
}

module.exports = new UserControler();
