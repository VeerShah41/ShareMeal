const express = require("express");
const { signup, login } = require("../controllers/auth");
const { auth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Example protected routes (optional)
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "User profile fetched",
    user: req.user,
  });
});

// Example: only donors can access
router.get("/donor-only", auth, requireRole("donor"), (req, res) => {
  res.json({ message: "Welcome Donor!" });
});

// Example: only volunteers can access
router.get("/volunteer-only", auth, requireRole("volunteer"), (req, res) => {
  res.json({ message: "Welcome Volunteer!" });
});

module.exports = router;
