var mongoose = require('mongoose');
var config = require('../config');
var logger = require('../common/logger').logger;

mongoose.connect(config.db, {
	server: {poolsize: 20}
}, function (err) {
	if (err) {
		logger.error('connect to '+ config.db +' error: ' + err.message);
		process.exit(1);
	}
});

require('./article.js');
exports.Article = mongoose.model('article');