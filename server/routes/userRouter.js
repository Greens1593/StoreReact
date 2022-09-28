const Router = require('express');
const userControler = require('../controllers/userControler');
const authMidlleware = require('../middleware/authMidlleware');

const router = new Router();

router.post('/registration', userControler.registration)
router.post('/login', userControler.login)
router.get('/auth', authMidlleware, userControler.check)


module.exports = router