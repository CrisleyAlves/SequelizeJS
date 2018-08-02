const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/Category");

router.get("/", categoryController.getAll);
router.get("/:categoryId", categoryController.getById);
router.post("/", categoryController.insert);
router.put("/", categoryController.update);
router.delete("/:categoryId", categoryController.delete);

module.exports = router;