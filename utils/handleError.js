const handleError = (res, statusCode, msg) => {
    return res.status(statusCode).json({ status: false, msg });
};
module.exports = handleError;
  