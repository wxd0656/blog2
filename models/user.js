var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: { type: String },
	password: { type: String },

	create_at: { type: Date, default: Date.now },

	deleted: { type: Boolean, default: false }
});


mongoose.model('user', UserSchema);