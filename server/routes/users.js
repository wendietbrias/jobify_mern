const router = require("express").Router();
const {
  SignUpHandler,
  SignInHandler,
  UpdateUserData,
} = require("../controller/users");

router.post("/signup", SignUpHandler);
router.post("/signin", SignInHandler);
router.patch("/update/:id", UpdateUserData);

module.exports = router;
