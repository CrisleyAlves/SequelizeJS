const express = require("express");
const router = express.Router();

const productController = require("../controllers/Product");

router.get("/", productController.getAll);
router.get("/:productId", productController.getById);
router.post("/", productController.insert);
router.put("/", productController.update);
router.delete("/:productId", productController.delete);

module.exports = router;