import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productCode: {
      type: String,
      // required: true,
    },
    categoryCode: {
      type: String,
      // required: true,
    },
    // productIndividualID: {
    //   type: String,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    datasheet: {
      type: String,
      required: false,
    },
    manual: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 5,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 5,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    nameThai: {
      type: String,
      required: true,
    },
    descriptionThai: {
      type: String,
      required: true,
    },
    brandThai: {
      type: String,
      required: true,
    },
    categoryThai: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
