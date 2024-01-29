module.exports = (err, req, res, next) => {
    console.log(err)
  let errMessage = err.message.split("::")[0] || err.message;
  let statusCode = err.message.split("::")[1] || 500;
  res.status(statusCode).json({ error: errMessage });
};
