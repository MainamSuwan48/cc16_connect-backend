const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tryCatch = (func) => (req, res, next) => func(req, res, next).catch(next);

exports.register = tryCatch(async (req, res, next) => {
  const { s_code, password, confirmPassword, firstname, email } = req.body;

  if (!(s_code && password && confirmPassword && firstname)) {
    return next(new Error("please fill in the blank section::400"));
  }
  if (password !== confirmPassword) {
    return next(new Error("passwords do not match::400"));
  }

  const { confirmPassword: cfpw, ...data } = req.body;
  console.log(data);
  data.password = await bcrypt.hash(data.password, 10);
  console.log(data);
  const newStudent = await db.student.create({ data: data });

  res.status(200).json({ message: "register successful" });
});

exports.login = tryCatch(async (req, res, next) => {
  const { s_code, password } = req.body;
  const user = await db.student.findUnique({
    where: {
      s_code: s_code,
    },
  });
  if (!user) {
    return next(new Error("No user found::400"));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new Error("Incorrect Password::400"));
  }
  const secretkey = "C04NM4N";
  const payload = {
    id: user.id,
    firstname: user.firstname,
    s_code: user.s_code,
    email: user.email,
  };

  const token = jwt.sign(payload, secretkey, { expiresIn: 60 * 60 });

  res.status(200).json({ message: "login successful", user: payload, token });
});
