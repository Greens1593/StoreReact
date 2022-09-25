const Router = require('express');
const userControler = require('../controllers/userControler');

const router = new Router();

router.post('/registration', userControler.registration)
router.post('/login', userControler.login)
router.get('/auth', userControler.check)


module.exports = router