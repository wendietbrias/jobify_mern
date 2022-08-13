const router = require("express").Router();
const verifyMiddleware = require("../middleware/verifyMiddleware");

const {
  GetAllJobs,
  CreateJob,
  DeleteJob,
  UpdateJob,
  SearchJobs,
} = require("../controller/jobs");

router.get("/", verifyMiddleware, GetAllJobs);
router.get("/search", verifyMiddleware, SearchJobs);
router.post("/create", verifyMiddleware, CreateJob);
router.delete("/delete/:id", verifyMiddleware, DeleteJob);
router.put("/update/:id", verifyMiddleware, UpdateJob);

module.exports = router;
