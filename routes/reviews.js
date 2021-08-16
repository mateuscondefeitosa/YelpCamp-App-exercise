const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, verifyReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')
const catchAsync = require('../utilities/catchAsync');

// REVIEWS ROUTE
router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview));

// REVIEWS DELETE
router.delete('/:reviewId', isLoggedIn, verifyReviewAuthor, catchAsync(reviews.deleteReview));


module.exports = router;