var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: { type: String },
	content: { type: String },
	top: { type: Boolean, default: false},
	tag: { type: String },
	type: { type: String },
	visiblity: { type: Number }, // 0 只对自己 1 对所有人

	visit_count: { type: Number, default: 0 },

	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now },

	deleted: { type: Boolean, default: false }
});


ArticleSchema.index({create_at: -1});
ArticleSchema.index({type: 1});
ArticleSchema.index({tag: 1});


mongoose.model('article', ArticleSchema);