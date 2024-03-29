const Restaurant = require('../model/restaurant');

/**
 * Finds a single restaurant in the restaurant collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the Restaurant that matches the id
 */
module.exports = (_id) => {
    return Restaurant.findById(_id);
};
