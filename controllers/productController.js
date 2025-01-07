import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// Add download route for datasheet
// @desc    Download product datasheet
// @route   GET /api/products/:id/datasheet
// @access  Public
const downloadProductDatasheet = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.datasheet) {
    const filePath = path.join(
      __dirname,
      '../uploads/datasheets',
      path.basename(product.datasheet)
    ); // Adjust the path as necessary
    res.download(filePath, 'datasheet.pdf', (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error downloading the file.');
      }
    });
  } else {
    res.status(404);
    throw new Error('Datasheet not found');
  }
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            nameThai: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// // @desc    Fetch all products
// // @route   GET /api/products
// // @access  Public
// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = process.env.PAGINATION_LIMIT;
//   const page = Number(req.query.pageNumber) || 1;

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         },
//       }
//     : {};

//   const count = await Product.countDocuments({ ...keyword });
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.json({ products, page, pages: Math.ceil(count / pageSize) });
// });

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    // productIndividualID,
    name,
    price,
    image,
    datasheet,
    manual,
    brand,
    category,
    countInStock,
    description,
    nameThai,
    descriptionThai,
    brandThai,
    categoryThai,
    productCode,
    categoryCode,
  } = req.body;

  if (!name || !price || !brand || !category) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const product = new Product({
    // productIndividualID,
    name,
    price,
    user: req.user._id,
    image,
    datasheet,
    manual,
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
    nameThai,
    descriptionThai,
    brandThai,
    categoryThai,
    productCode,
    categoryCode,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// // @desc    Create a product
// // @route   POST /api/products
// // @access  Private/Admin
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: 'Sample name',
//     price: 0,
//     user: req.user._id,
//     image: '/images/sample.jpg',
//     datasheet: '/images/datasheet.pdf',
//     manual: '/images/manual.pdf',
//     brand: 'Sample brand',
//     category: 'Sample category',
//     countInStock: 0,
//     numReviews: 0,
//     description: 'Sample description',
//   });

//   const createdProduct = await product.save();
//   res.status(201).json(createdProduct);
// });

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    datasheet,
    manual,
    brand,
    category,
    countInStock,
    nameThai,
    descriptionThai,
    brandThai,
    categoryThai,
    productCode,
    categoryCode,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.datasheet = datasheet;
    product.manual = manual;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.nameThai = nameThai;
    product.descriptionThai = descriptionThai;
    product.brandThai = brandThai;
    product.categoryThai = categoryThai;
    product.productCode = productCode;
    product.categoryCode = categoryCode;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  downloadProductDatasheet,
};
