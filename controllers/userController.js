import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, shippingAddress, billingAddress } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Ensure shippingAddress exists before destructuring
  const newShippingAddress = shippingAddress
    ? {
        shippingname: shippingAddress.shippingname || '',
        address: shippingAddress.address || '',
        city: shippingAddress.city || '',
        postalCode: shippingAddress.postalCode || '',
        country: shippingAddress.country || '',
        phone: shippingAddress.phone || '',
      }
    : {};

  const newBillingAddress = billingAddress
    ? {
        billingName: billingAddress.billingName || '',
        billinggAddress: billingAddress.billinggAddress || '',
        billingCity: billingAddress.billingCity || '',
        billingPostalCode: billingAddress.billingPostalCode || '',
        billingCountry: billingAddress.billingCountry || '',
        billingPhone: billingAddress.billingPhone || '',
        tax: '',
      }
    : {};

  const user = await User.create({
    name,
    email,
    password,
    shippingAddress: newShippingAddress, // Use the prepared shippingAddress
    billingAddress: newBillingAddress, // Use the prepared billingAddress
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // shippingAddress: user.shippingAddress,
      // billingAddress: user.billingAddress,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/shipping
// @access  Private
const updateUserProfileShipping = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update shipping address if provided
    if (req.body.shippingAddress) {
      const {
        shippingname = user.shippingAddress.shippingname,
        address = user.shippingAddress.address,
        city = user.shippingAddress.city,
        postalCode = user.shippingAddress.postalCode,
        country = user.shippingAddress.country,
        phone = user.shippingAddress.phone,
      } = req.body.shippingAddress;

      user.shippingAddress = {
        shippingname,
        address,
        city,
        postalCode,
        country,
        phone,
      };
    }

    // Update billing address if provided
    if (req.body.billingAddress) {
      const {
        billingName = user.billingAddress.billingName,
        billinggAddress = user.billingAddress.billinggAddress,
        billingCity = user.billingAddress.billingCity,
        billingPostalCode = user.billingAddress.billingPostalCode,
        billingCountry = user.billingAddress.billingCountry,
        billingPhone = user.billingAddress.billingPhone,
        tax = user.billingAddress.tax,
      } = req.body.billingAddress;

      user.billingAddress = {
        billingName,
        billinggAddress,
        billingCity,
        billingPostalCode,
        billingCountry,
        billingPhone,
        tax,
      };
    }

    // Save updated user data
    await user.save();

    res.json({
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserProfileShipping,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
