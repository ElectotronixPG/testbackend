import asyncHandler from '../middleware/asyncHandler.js';
import Showcase from '../models/showcaseMode.js';

// @desc    Fetch all Showcases
// @route   GET /api/showcases
// @access  Public
const getShowcases = asyncHandler(async (req, res) => {
  const showcases = await Showcase.find({});
  res.json(showcases);
});

// @desc    Fetch single Showcase
// @route   GET /api/showcases/:id
// @access  Public
const getShowcaseById = asyncHandler(async (req, res) => {
  const showcase = await Showcase.findById(req.params.id);
  if (showcase) {
    return res.json(showcase);
  } else {
    res.status(404);
    throw new Error('Showcase not found');
  }
});

// @desc    Create a showcase
// @route   POST /api/showcases
// @access  Private/Admin
const createShowcase = asyncHandler(async (req, res) => {
  const { name, image, category, nameThai, categoryThai } = req.body;

  if (!name || !nameThai || !categoryThai || !category) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const showcase = new Showcase({
    name,
    image,
    category,
    nameThai,
    categoryThai,
  });

  const createdShowcase = await showcase.save();
  res.status(201).json(createdShowcase);
});

// @desc    Update a showcase
// @route   PUT /api/showcases/:id
// @access  Private/Admin
const updateShowcase = asyncHandler(async (req, res) => {
  const { name, image, category, nameThai, categoryThai } = req.body;

  const showcase = await Showcase.findById(req.params.id);

  if (showcase) {
    showcase.name = name;
    showcase.image = image;
    showcase.category = category;
    showcase.nameThai = nameThai;
    showcase.categoryThai = categoryThai;

    const updatedShowcase = await showcase.save();
    res.json(updatedShowcase);
  } else {
    res.status(404);
    throw new Error('Showcase not found');
  }
});

// @desc    Delete a showcase
// @route   DELETE /api/showcases/:id
// @access  Private/Admin
const deleteShowcase = asyncHandler(async (req, res) => {
  const showcase = await Showcase.findById(req.params.id);

  if (showcase) {
    await Showcase.deleteOne({ _id: showcase._id });
    res.json({ message: 'Showcase removed' });
  } else {
    res.status(404);
    throw new Error('Showcase not found');
  }
});

export {
  getShowcases,
  getShowcaseById,
  createShowcase,
  updateShowcase,
  deleteShowcase,
};
