const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SignInHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "please fill the field" });
  }

  const singleAccount = await userModel.findOne({ email: email });

  if (!singleAccount) {
    return res.status(400).json({ msg: "account is not exists" });
  }

  const verifiyPass = bcrypt.compareSync(
    req.body.password,
    singleAccount.password
  );

  if (!verifiyPass) {
    return res.status(401).json({ msg: "Password wrong!" });
  }

  try {
    const token = jwt.sign(
      {
        _id: singleAccount?._id,
        name: singleAccount.name,
        email: singleAccount.email,
      },
      `${process.env.SECRET}`,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: singleAccount, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const SignUpHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "complete the field please" });
  }

  const singleUser = await userModel.findOne({ email: email });

  if (singleUser) {
    return res.status(400).json({ msg: "Account is already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const initData = new userModel({ ...req.body, password: hashedPassword });

  try {
    const token = jwt.sign(
      { _id: initData?._id, name: initData.name, email: initData.email },
      `${process.env.SECRET}`,
      { expiresIn: "1d" }
    );

    const returned = await initData.save();
    res.status(200).json({ result: returned, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const UpdateUserData = async (req, res) => {
  const id = req.params.id;
  const { name, email, location, lastName } = req.body;
  const singleUser = await userModel.findById(id);

  if (!singleUser) {
    return res.status(401).json({ msg: "Account is not found" });
  }

  singleUser.name = lastName ? name.concat(` ${lastName}`) : name;
  singleUser.email = email;
  singleUser.location = location;

  try {
    const savedDocs = await singleUser.save();
    res.status(200).json(savedDocs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { SignInHandler, SignUpHandler, UpdateUserData };
