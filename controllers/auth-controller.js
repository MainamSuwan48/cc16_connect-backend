const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

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
  const { t_code, s_code, password } = req.body;
  if (s_code && t_code) {
    throw new Error("Please enter only student code or teacher code ::400");
  }
  if (s_code && !/^[s]\d{3}$/.test(s_code)) {
    throw new Error("Wrong code format");
  }
  if (t_code && !/^[t]\d{3}$/.test(t_code)) {
    throw new Error("Wrong code format");
  }
  const user = t_code
    ? await db.teacher.findFirstOrThrow({
        where: {
          t_code: t_code,
        },
      })
    : await db.student.findFirstOrThrow({
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

  const payload = {
    id: user.id,
    firstname: user.firstname,
    t_code: user.t_code,
    s_code: user.s_code,
    email: user.email,
  };
  const secretkey = process.env.SECRETKEY;
  const token = jwt.sign(payload, secretkey, { expiresIn: 60*60*24 });
  console.log(payload);
  res.status(200).json({ message: "login successful", user: payload, token });
});

exports.getMe = (req, res, next) => {
  res.json(req.user);
};
