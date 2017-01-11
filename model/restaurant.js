const mongoose = require('mongoose');
const DishSchema = require('./dish');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    address: String,
    sum_of_ratings: { type: Number, default: 0},
    dishes: [DishSchema]
});

RestaurantSchema.virtual('average').get(function() {
    if(this.dishes.length > 0){
        return this.sum_of_ratings / this.dishes.length;
    }
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);
module.exports = Restaurant;