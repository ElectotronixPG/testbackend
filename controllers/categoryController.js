import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import Category from '../models/categoryModel.js';

// @desc    Create a new category
// @route   POST /api/categorys
// @access  Public
const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryNameThai, categoryShortName } = req.body;

  const categoryExists = await Category.findOne({
    categoryName,
    categoryNameThai,
    categoryShortName,
  });

  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({
    categoryName,
    categoryShortName,
    categoryNameThai,
    createdAt: Date.now(),
  });

  if (category) {
    res.status(201).json({
      _id: category._id,
      categoryName: category.categoryName,
      categoryNameThai: category.categoryNameThai,
      categoryShortName: category.categoryShortName,
      createdAt: Date.now(),
    });
  } else {
    res.status(400);
    throw new Error('Invalid category data');
  }
});

// @desc    Update category
// @route   PUT /api/categorys/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.categoryName = req.body.categoryName || category.categoryName;
    category.categoryNameThai =
      req.body.categoryNameThai || category.categoryNameThai;
    category.categoryShortName =
      req.body.categoryShortName || category.categoryShortName;

    const updatedCategory = await category.save();

    res.json({
      _id: updatedCategory._id,
      categoryName: updatedCategory.categoryName,
      categoryNameThai: updatedCategory.categoryNameThai,
      categoryShortName: updatedCategory.categoryShortName,
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete category
// @route   DELETE /api/categorys/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    // Assuming you're using authentication and have req.user populated
    if (!req.user || req.user.isAdmin !== true) {
      res.status(403); // Forbidden
      throw new Error('Not authorized to delete this category');
    }

    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Get all categorys
// @route   GET /api/categorys
// @access  Private/Admin
const getCategorys = asyncHandler(async (req, res) => {
  const categorys = await Category.find({});
  res.json(categorys);
});

// @desc    Get category by ID
// @route   GET /api/categorys/:id
// @access  Private/Admin
const getCategoryDetails = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategorys,
  getCategoryDetails,
};
