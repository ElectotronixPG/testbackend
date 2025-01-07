import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryNameThai: {
      type: String,
      required: true,
      unique: true,
    },
    categoryShortName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
