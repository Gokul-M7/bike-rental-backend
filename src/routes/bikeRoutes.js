const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addBike,
  getAllBikes,
  getMyBikes,
   updateBike,
  deleteBike
} = require("../controllers/bikeController");

// Public Route
router.get("/",getAllBikes);

// Protected Routes
router.post("/", protect, addBike);

router.get("/my", protect, getMyBikes);
router.put("/:id", protect, updateBike);
router.delete("/:id", protect, deleteBike);
module.exports = router;