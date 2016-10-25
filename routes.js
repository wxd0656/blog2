var express = require('express');
var router = express.Router();

var auth = require('./controllers/auth');
var site = require('./controllers/site');
var sign = require('./controllers/sign');
var article = require('./controllers/article');

var config = require('./config');
var multer = require('multer');
var upload = multer({dest: config.upload.path});

/* GET home page. */
router.get('/', site.index);

router.get('/zmkm', sign.renderSignin);
router.post('/zmkm', sign.signin);
router.post('/signout', sign.signout);

router.get('/manage', auth.loginRequire, site.manage);

router.get('/article/create', auth.loginRequire, article.renderCreate);
router.post('/article/create', auth.loginRequire, article.create);
router.get('/article/:aid', article.index);
router.get('/article/:aid/top', auth.loginRequire, article.top);
router.get('/article/:aid/edit', auth.loginRequire, article.renderEdit);
router.post('/article/:aid/edit', auth.loginRequire, article.update);
router.get('/article/:aid/delete', auth.loginRequire, article.deleteArticle);

router.post('/upload', auth.loginRequire, upload.array('file', 12) , article.upload);

router.get('/about', site.renderAbout);

module.exports = router;
