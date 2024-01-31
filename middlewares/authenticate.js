const jwt = require("jsonwebtoken");
const db = require("../models/db");
const tryCatch = require("../utils/tryCatch");

module.exports = tryCatch(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("Unauthorized");
  }
  if (!authorization.startsWith("Bearer")) {
    throw new Error("Unauthorized");
  }
  const token = authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    throw new Error("Unauthorized");
  }
  const payload = jwt.verify(token, process.env.SECRETKEY);
  console.log(payload);
  const { id, s_code, t_code } = payload;
  const result = t_code
    ? await db.teacher.findFirstOrThrow({ where: { t_code: t_code } })
    : await db.student.findFirstOrThrow({ where: { s_code: s_code } });
  delete result.password;
  result.role = t_code ? "teacher" : "student";
  req.user = result;

  next();
});
