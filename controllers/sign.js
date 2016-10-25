'use strict'

let User = require('../dao').User;

exports.renderSignin = function(req, res, next) {
	res.render('sign', { msg: null });
}

exports.signin = function (req, res, next) {
	// body...
	let username = req.body.username;
	let pwd = req.body.pwd;

	if (!username || !pwd) {
	    res.status(422);
	    return res.render('sign', { msg: '信息不完整。' });
	} 

	User.getUserByQuery({ username: username, deleted: false}, null, function(err, user) {
		let msg = '';
		if (err) {
			return next(err);
		}
		if (user.length === 0) {
			msg = '用户不存在！';
		} else if (user[0].password != pwd) {
			msg = '密码错误！';
		} else if (user[0].password === pwd) {
			req.session.user = user[0];
			return res.redirect('/manage');
		}
		res.render('sign', { msg: msg });
	});
}

exports.signout = function (req, res, next) {
	// body...
	req.session.destroy();
	res.redirect('/');
}