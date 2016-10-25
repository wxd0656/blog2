var Article = require('../models').Article;




exports.getArticleById = function (id, callback) {
	// body...
	Article.findOne({ _id: id, deleted: false }, callback);
}


exports.getAllArticle = function (id, callback) {
	Article.find({ deleted: false }, callback);
}


exports.getArticles = function (limit, offset, callback) {
	Article.find({ deleted: false }, { limit: limit, skip: offset, sort:'-top -create_at' }, callback);
}

exports.getArticlesCount = function (query, callback) {
	Article.count(query, callback);
}

exports.getArticlesByQuery = function(query, option, callback) {
	Article.find(query, {}, option, callback);
}



exports.createArticle = function (title, content, tag, type, callback) {
	var article = new Article();
	article.title = title;
	article.content = content;
	article.tag = tag;
	article.type = type;

	article.save(callback);
}