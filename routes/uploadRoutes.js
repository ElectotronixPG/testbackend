import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Datasheet Upload
const datasheetStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/datasheets/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function datasheetFileFilter(req, file, cb) {
  const filetypes = /pdf/;
  const mimetypes = /application\/pdf/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Datasheet pdf file only!'), false);
  }
}

const uploadDatasheet = multer({
  storage: datasheetStorage,
  fileFilter: datasheetFileFilter,
});
const uploadSingleDatasheet = uploadDatasheet.single('datasheet');

router.post('/datasheet', (req, res) => {
  uploadSingleDatasheet(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Datasheetuploaded successfully',
      datasheet: `/${req.file.path}`,
    });
  });
});

// Manual Upload
const manualStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/manuals/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function manualFileFilter(req, file, cb) {
  const filetypes = /pdf/;
  const mimetypes = /application\/pdf/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Manual pdf file only!'), false);
  }
}

const uploadManual = multer({
  storage: manualStorage,
  fileFilter: manualFileFilter,
});
const uploadSingleManual = uploadManual.single('manual');

router.post('/manual', (req, res) => {
  uploadSingleManual(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Manualuploaded successfully',
      manual: `/${req.file.path}`,
    });
  });
});

// Image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;
