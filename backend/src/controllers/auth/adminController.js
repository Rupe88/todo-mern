import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // attempt to find and delete the user
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete user" });
  }
});

// get all users with optional search filter
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Extract search filter query parameters
    const { name, email, role } = req.query;

    // Build search criteria object based on available parameters
    const searchCriteria = {};
    if (name) {
      searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive
    }
    if (email) {
      searchCriteria.email = { $regex: email, $options: "i" };
    }
    if (role) {
      searchCriteria.role = role; 
    }

    const users = await User.find(searchCriteria);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Cannot get users" });
  }
});
