const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, verifyAuthor, validateCampground } = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary/index')
const upload = multer({ storage });


router.route('/')
    .get( catchAsync(campgrounds.index))
    .post( isLoggedIn, upload.array('campground[image]'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.newForm);   

router.route('/:id')
    .get( catchAsync(campgrounds.showCampground))
    .put( isLoggedIn, verifyAuthor, upload.array('campground[image]'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn, verifyAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, verifyAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;