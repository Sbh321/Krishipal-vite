import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if password is at least 8 characters long
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  // Check if password contains at least one number
  const numberRegex = /[0-9]/;
  if (!numberRegex.test(password)) {
    res.status(400);
    throw new Error("Password must contain at least one number");
  }

  // Check if password contains at least one special character
  const specialCharRegex = /[!@#$%^&*]/;
  if (!specialCharRegex.test(password)) {
    res.status(400);
    throw new Error("Password must contain at least one special character");
  }

  // Check if password contains at least 2 letters
  const letterRegex = /[a-zA-Z]/g;
  const letters = password.match(letterRegex) || [];
  if (letters.length < 2) {
    res.status(400);
    throw new Error("Password must contain at least 2 letters");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get User profile
// @route   Get /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   Put /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // Check if password is at least 8 characters long
      if (req.body.password.length < 8) {
        res.status(400);
        throw new Error("Password must be at least 8 characters long");
      }

      // Check if password contains at least one number
      const numberRegex = /[0-9]/;
      if (!numberRegex.test(req.body.password)) {
        res.status(400);
        throw new Error("Password must contain at least one number");
      }

      // Check if password contains at least one special character
      const specialCharRegex = /[!@#$%^&*]/;
      if (!specialCharRegex.test(req.body.password)) {
        res.status(400);
        throw new Error("Password must contain at least one special character");
      }

      // Check if password contains at least 2 letters
      const letterRegex = /[a-zA-Z]/g;
      const letters = req.body.password.match(letterRegex) || [];
      if (letters.length < 2) {
        res.status(400);
        throw new Error("Password must contain at least 2 letters");
      }

      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get users
// @route   Get /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get users by id
// @route   Get /api/users/:id
// @access  Private/Admin

const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete users
// @route   Delete /api/users:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await user.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update users
// @route   Put /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const googleOauth = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      const generatePassword = email + process.env.JWT_SECRET;

      const newUser = await User.create({
        name,
        email,
        password: generatePassword,
      });

      generateToken(res, newUser._id);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });

      if (!newUser) {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    next(error);
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
  googleOauth,
};
