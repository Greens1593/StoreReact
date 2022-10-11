const Router = require("express");
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), typeController.create);
router.delete("/:id", checkRoleMiddleware("ADMIN"), typeController.delete);
router.get("/", typeController.getAll);

module.exports = router;
