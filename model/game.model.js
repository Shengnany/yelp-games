const mongoose = require('mongoose');
const Review = require('./review.model')
const Schema = mongoose.Schema;


const opts = { toJSON: { virtuals: true } };

const GameSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
    ],
    author: {
        // type: Schema.Types.ObjectId,
        // ref: 'User'
        type:String
    }
}, opts);



GameSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

GameSchema.post('deleteMany', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Game', GameSchema);