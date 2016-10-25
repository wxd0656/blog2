var path = require('path');

module.exports = {
	// mongodb 配置
  db: 'mongodb://127.0.0.1/dx_node_blog',
  dbname: 'dx_node_blog',

  session_secret: 'dx_node_session',

  articlesPerPage: 5,

  upload: {
  	path: path.join(__dirname, 'public/upload/'),
  	url: '/upload/'
  }
}