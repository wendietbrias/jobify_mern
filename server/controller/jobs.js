const jwt = require("jsonwebtoken");
const jobs = require("../models/jobs");
const jobsModel = require("../models/jobs");

const GetAllJobs = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Please signin first or signup" });
  }

  const findJobs = await jobsModel.find({ userId: { $eq: userId } });

  try {
    res.status(200).json(findJobs);
  } catch (err) {
    res.status(500).json({ msg: err.messsage });
  }
};

const CreateJob = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Please signin first or signup" });
  }

  const initData = new jobsModel({
    position: req.body.position,
    company: req.body.company,
    location: req.body.location,
    status: req.body.status,
    jobType: req.body.jobType,
    userId,
  });

  try {
    const saved = await initData.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const DeleteJob = async (req, res) => {
  const id = req.params.id;
  try {
    await jobsModel.deleteOne({ _id: id });
    res.status(200).json({ msg: "success deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.messaagge });
  }
};

const UpdateJob = async (req, res) => {
  const id = req.params.id;
  const { position, company, location, status, jobType } = req.body;

  try {
    const updated = await jobsModel.updateOne(
      { _id: id },
      {
        $set: {
          position,
          company,
          location,
          status,
          jobType,
        },
      }
    );

    const singleJob = await jobsModel.findById(id);
    res.status(200).json(singleJob);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const SearchJobs = async (req, res) => {
  const userId = req.userId;
  let { search, status, type, sort } = req.query;
  let query = jobsModel.find({ userId: { $eq: userId } });

  if (search) {
    query = query.regex("company", new RegExp(search, "i"));
  }

  if (status) {
    if (status === "all") {
      status = "";
    }
    query = query.regex("status", new RegExp(status, "i"));
  }

  if (type) {
    if (type === "all") {
      type = "";
    }

    query = query.regex("jobType", new RegExp(type, "i"));
  }

  if (sort) {
    if (sort === "a-z") {
      query = query.sort({ company: 1, position: 1 });
    }
  }

  try {
    const executed = await query.exec();
    res.status(200).json(executed);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { GetAllJobs, CreateJob, DeleteJob, UpdateJob, SearchJobs };
