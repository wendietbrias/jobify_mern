require("dotenv").config({ debug: true });

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");

const port = process.env.PORT;

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use("/auth", userRoutes);
app.use("/job", jobRoutes);

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
  })
  .then(function () {
    app.listen(port, () => console.log(`run on port : ${port}`));
  })
  .catch((err) => console.log(err.message));
