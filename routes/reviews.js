const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('./middleware');
const Game = require('../model/game.model');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('./utils/ExpressError');
// const catchAsync = require('./utils/catchAsync');

router.route('/').post( validateReview, catchAsync(reviews.createReview))

router.route('/:reviewId').delete(  isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;