const Router = require("express");
const deviceController = require("../controllers/deviceController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), deviceController.create);
router.post("/:id", deviceController.estimate);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.delete("/:id", checkRoleMiddleware("ADMIN"), deviceController.delete);
router.put("/", checkRoleMiddleware("ADMIN"), deviceController.change);

module.exports = router;
