const User = require("../models/user");

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        res
            .status(200)
            .json({ user, status: true, msg: "Profile found successfully.." });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};

// Update Profile Picture
exports.updateProfilePicture = async (req, res) => {
    try {
        const { profilePicture } = req.body;

        // Update the user profile picture
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }

        return res
            .status(200)
            .json({
                user: updatedUser,
                status: true,
                msg: "Profile updated successfully..",
            });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        res.status(200).json({ status: true, msg: "Profile deleted successfully" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};