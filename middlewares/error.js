module.exports = (err, req, res, next) => {
    console.log(err.message)
  let errMessage = err.message.split("::")[0] || err.message;
  let statusCode = err.message.split("::")[1] || 500;
  statusCode = err.message.includes('found') ?400:statusCode;
  res.status(statusCode).json({ error: errMessage });
};
