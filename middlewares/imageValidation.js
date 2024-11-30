const { isValidImageType } = require("../utils/validation");

const validateImageType = (req, res, next) => {
  const { profilePicture } = req.body;

  if (!profilePicture) {
    return res.status(400).json({ status: false, msg: "Profile picture is required" });
  }

  if (!isValidImageType(profilePicture)) {
    return res.status(400).json({ status: false, msg: "Invalid image type. Allowed types are JPG, JPEG, PNG, and GIF" });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = validateImageType;
