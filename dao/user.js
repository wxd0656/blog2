var User = require('../models').User;


exports.getUserByQuery = function (query, opt, callback) {
	User.find(query, {}, opt, callback);
}