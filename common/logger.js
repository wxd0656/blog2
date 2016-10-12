var log4js = require('log4js');

log4js.configure({
	appenders:[
		{type:'console'},
		{type:'file', filename:__dirname+'/../log/bloglog.log', category:'log', maxLogSize: 51200, backups: 1000},
	]
});


var logger = log4js.getLogger('log');

exports.logger = logger;