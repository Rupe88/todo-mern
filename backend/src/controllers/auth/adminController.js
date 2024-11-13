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
    // Extract search and filter query parameters
    const { name, email, role, startDate, endDate, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    // Build search criteria object
    const searchCriteria = {};

    // Apply search filters for name and email (case-insensitive)
    if (name) {
      searchCriteria.name = { $regex: name, $options: "i" };
    }
    if (email) {
      searchCriteria.email = { $regex: email, $options: "i" };
    }
    if (role) {
      searchCriteria.role = role;
    }

    // Apply date range filter (createdAt between startDate and endDate)
    if (startDate || endDate) {
      searchCriteria.createdAt = {};
      if (startDate) {
        searchCriteria.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        searchCriteria.createdAt.$lte = new Date(endDate);
      }
    }

    // Determine sort order (ascending or descending)
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default: sort by creation date in descending order
    }

    // Calculate pagination options
    const skip = (page - 1) * limit;

    // Query the database
    const users = await User.find(searchCriteria)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Count total documents for pagination
    const totalUsers = await User.countDocuments(searchCriteria);

    // Return paginated, filtered, and sorted results
    res.status(200).json({
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Cannot get users" });
  }
});