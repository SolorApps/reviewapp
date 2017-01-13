const Restaurant = require('../model/restaurant');

/**
 * Adds a single dish to dishes in the restaurant collection.
 * @param {object} dishProps - Object containing a name, content, latest_image_uploaded, rating, reviews
 * @return {promise} A promise that resolves with the Restaurant that was updated
 * 
 */
// module.exports = (_id, dishProps) => {
//     console.log(dishProps);
//     return Restaurant.findByIdAndUpdate(_id, {$push:{dishes:dishProps}, $inc: { sum_of_ratings: dishProps.rating }}, {new :true})
// };

module.exports = (_id, name, rating=0) => {
    var dishProps = {
        name:name,
        rating: rating
    }
    console.log(dishProps);
    return Restaurant.findByIdAndUpdate(_id, {$push:{dishes:dishProps}, $inc: { sum_of_ratings: dishProps.rating }}, {new :true})
};