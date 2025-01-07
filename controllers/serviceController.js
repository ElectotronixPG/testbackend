import asyncHandler from '../middleware/asyncHandler.js';
import Service from '../models/serviceModel.js';

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Service.countDocuments({ ...keyword });
  const services = await Service.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ services, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const service = await Service.findById(req.params.id);
  if (service) {
    return res.json(service);
  } else {
    // NOTE: this will run if a valid ObjectId but no service was found
    // i.e. service may be null
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const { name, image, description, nameThai, descriptionThai } = req.body;

  if (!name || !nameThai || !description || !descriptionThai) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const service = new Service({
    user: req.user._id,
    name,
    description,
    nameThai,
    descriptionThai,
    image,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const { name, description, nameThai, descriptionThai, image } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = name;
    service.description = description;
    service.nameThai = nameThai;
    service.descriptionThai = descriptionThai;
    service.image = image;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await Service.deleteOne({ _id: service._id });
    res.json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
