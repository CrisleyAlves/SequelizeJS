const express = require("express");
const router = express.Router();

const orderController = require("../controllers/Order");

router.get("/", orderController.getAll);
router.get("/:orderId", orderController.getById);
router.post("/", orderController.insert);
router.put("/", orderController.update);
router.delete("/:orderId", orderController.delete);

module.exports = router;