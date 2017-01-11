const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    content: String,
    rating: Number,
    user:{ type:Schema.Types.ObjectId,ref:'user' }
});

const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;