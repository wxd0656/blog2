

exports.loginRequire = function(req, res, next) {
	console.log(req.session.user);
	if (!req.session.user || !req.session.user._id) {
		return res.status(403).send('forbidden!');
	}
	next();
}

