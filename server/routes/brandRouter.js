const Router = require("express");
const brandController = require("../controllers/brandController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), brandController.create);
router.delete("/:id", checkRoleMiddleware("ADMIN"), brandController.delete);
router.get("/", brandController.getAll);
router.put("/", checkRoleMiddleware("ADMIN"), brandController.change);

module.exports = router;
