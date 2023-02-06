const router = require("express").Router();

const { register, login, userData } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.get("/me", protect, userData);

module.exports = router;
