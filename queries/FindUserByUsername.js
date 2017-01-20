const User = require('../model/user');

/**
 * Finds a user in the users collection.
 * @return {promise} A promise that resolves with the user that matches the username
 */
module.exports = (username) => {
    return User.findOne({username:username});
};
