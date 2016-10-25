'use strict'

let Article = require('../dao').Article;
let config = require('../config');
let Markdown = require('../common/markdown');

exports.index = function (req, res, next) {
	// body...
	let aid = req.params.aid;

	Article.getArticleById(aid, function (err, article) {
		if (err) {
			return next(err);
		}
		if (!article) {
			return res.render404('此文章不存在或已被删除。');
		}
		article.visit_count++;
		article.save();

		article.mdContent = Markdown.markdown(article.content);
		res.render('article/detial', { article: article });
	});
}


exports.renderCreate = function (req, res, next) {
	res.render('article/edit');
}


exports.create = function (req, res, next) {
	let title = req.body.title;
	let content = req.body.content;
	let tag = req.body.tag;

	if (!title || !content || !tag) {
		return res.render('article/edit', { error:'标题，内容，标签不完整' })
	}

	Article.createArticle(title, content, tag, '', function (err) {
		if (err) {
			return next(err);
		}
		return res.redirect('/')
	})
}


exports.upload = function (req, res, next) {
	let file = req.files[0];
	console.log(file);
	if (file) {
		res.json({
			success: true,
			url: config.upload.url + file.filename
		})
	} else {
		next('file upload fail!');
	}
}

exports.top = function (req, res, next) {
	// body...
	let aid = req.params.aid;
	Article.getArticleById(aid, function (err, article) {
		if (err) {
			return next(err);
		}
		if (!article) {
			return res.render404('此文章不存在或已被删除。');
		}
		article.top = !article.top;
		article.save();
		res.redirect('/manage');
	})
}

exports.deleteArticle = function (req, res, next) {
	let aid = req.params.aid;
	console.log(aid);
	Article.getArticleById(aid, function (err, article) {
		if (err) {
			return next(err);
		}
		console.log(article);
		if (!article) {
			return res.render404('此文章不存在或已被删除。');
		}
		article.deleted = true;
		article.save();
		res.redirect('/manage');
	})
}

exports.renderEdit = function (req, res, next) {
	let aid = req.params.aid;
	Article.getArticleById(aid, function (err, article) {
		if (err) {
			return next(err);
		}
		if (!article) {
			return res.render404('此文章不存在或已被删除。');
		}
		res.render('article/edit', { action: 'edit', 
			aid: aid, 
			title: article.title,
			content: article.content,
			tag: article.tag
		});
	})
}

exports.update = function (req, res, next) {
	let aid = req.params.aid;
	let title = req.body.title;
	let content = req.body.content;
	let tag = req.body.tag;

	if (!title || !content || !tag) {
		return res.render('article/edit', { error:'标题，内容，标签不完整' })
	}

	Article.getArticleById(aid, function (err, article) {
		if (err) {
			return next(err);
		}
		if (!article) {
			return res.render404('此文章不存在或已被删除。');
		}
		article.title = title;
		article.content = content;
		article.tag = tag;
		article.save();
		return res.redirect('/manage');
	})

	
}
