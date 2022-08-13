const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    userId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobSchema);
