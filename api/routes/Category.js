const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/Category");

router.get("/", categoryController.getAll);
router.get("/:categoriaId", categoryController.getById);
router.post("/", categoryController.insert);
router.put("/", categoryController.update);
router.delete("/:categoriaId", categoryController.delete);

module.exports = router;