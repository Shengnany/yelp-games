const Game = require('../model/game.model');
const Review = require('../model/review.model');

module.exports.createReview = async (req, res) => {
    const game = await Game.findById(req.params.id);
    console.log(req.params.id)
    const review = new Review(req.body.data);
    // review.author = req.user._id;
     console.log("In post review" );
    game.reviews.push(review);
    await review.save();
    await game.save();
    return res.status(200).send(review);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Game.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    return res.status(201).send("Deleted");
}
