'use strict'
let config = require('../config');
let article = require('../dao').Article;
let Markdown = require('../common/Markdown');

let EventProxy = require('eventproxy');

exports.index = function(req, res, next) {
	let page = Number(req.query.page) || 1;
	let offset = config.articlesPerPage * (page-1);

	let query = { deleted: false };
	let articleType = req.query.type || null;
	if(articleType) {
		query.type = articleType
	}
	let tag = req.query.tag || null;
	if(tag) {	
		query.tag = tag;
	}
	let option = { limit: config.articlesPerPage, skip: offset, sort: '-top -create_at'};

	let ep = new EventProxy();

	ep.fail(next);

	article.getArticlesByQuery(query, option, ep.done('article', function(articles) {
		return articles;
	}));

	article.getArticlesCount(query, ep.done('count', function(count) {
		return count;
	}))

	ep.all('article', 'count', function(articles, count) {
		let pages = Math.ceil(count / config.articlesPerPage);
		for (let i of articles) {
			i.mPreview = Markdown.markdown(i.content.substring(0, 100));
		}
		res.render('index', { articles: articles, pages: pages, currentPage: page, tag: tag });
	});
}

exports.manage = function (req, res, next) {
	let page = Number(req.query.page) || 1;
	let offset = config.articlesPerPage * (page-1);

	let query = { deleted: false };
	let articleType = req.query.type || null;
	if(articleType) {
		query.type = articleType
	}

	let option = { limit: config.articlesPerPage, skip: offset, sort: '-top -create_at'};

	let ep = new EventProxy();

	ep.fail(next);

	article.getArticlesByQuery(query, option, ep.done('article', function(articles) {
		return articles;
	}));

	article.getArticlesCount(query, ep.done('count', function(count) {
		return count;
	}))

	ep.all('article', 'count', function(articles, count) {
		let pages = Math.ceil(count / config.articlesPerPage);
		res.render('manage/manage', { articles: articles, pages: pages, currentPage: page });
	});
}

exports.renderAbout = function (req, res, next) {
	// body...
	res.render('about');
}