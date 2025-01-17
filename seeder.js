import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import services from './data/services.js';
import categorys from './data/categorys.js';
import showcases from './data/showcases.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Service from './models/serviceModel.js';
import Category from './models/categoryModel.js';
import Showcase from './models/showcaseMode.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Service.deleteMany();
    await Category.deleteMany();
    await Showcase.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    const sampleServices = services.map((service) => {
      return { ...service, user: adminUser };
    });

    const sampleCategorys = categorys.map((service) => {
      return { ...service, user: adminUser };
    });

    const sampleShowcases = showcases.map((service) => {
      return { ...service, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    await Service.insertMany(sampleServices);
    await Category.insertMany(sampleCategorys);
    await Showcase.insertMany(sampleShowcases);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Service.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
