const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const User = require('../model/user.model');



module.exports.validateGame = (req, res, next) => {
    if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.isAuthenticated())
	// if (req.isAuthenticated()) return next();
    // res.status(404).send({
    //     message: false
    // })
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game.author.equals(req.user._id)) {
         return res.status(404).send({
            message:"cannot do that"
        });
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview =  (req, res, next) => {
   if (false) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

