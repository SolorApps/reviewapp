const mongoose = require('mongoose');
// var textSearch = require('mongoose-text-search');

const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: String,
    content: String,
    latest_image_uploaded: String,
    rating: { type: Number, default: 0},
    reviews: [{ type:Schema.Types.ObjectId,ref:'review' }]
});

// const Dish = mongoose.model('dish', DishSchema);

module.exports = DishSchema;