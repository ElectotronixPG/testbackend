import mongoose from 'mongoose';

const showcaseSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    nameThai: {
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

const Showcase = mongoose.model('Showcase', showcaseSchema);

export default Showcase;
