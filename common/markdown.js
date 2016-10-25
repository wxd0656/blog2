var Markdown = require('markdown-it');


var md = new Markdown();


md.set({
	html:         true,        // Enable HTML tags in source
	xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	breaks:       false,        // Convert '\n' in paragraphs into <br>
	linkify:      true,        // Autoconvert URL-like text to links
	typographer:  true,        // Enable smartypants and other sweet transforms
});

md.renderer.rules.fence = function (tokens, idx) {
  var token    = tokens[idx];
  var language = token.info && ('language-' + token.info) || '';

  return '<pre class="prettyprint ' + language + '">'
    + '<code>' + token.content + '</code>'
    + '</pre>';
};

md.renderer.rules.code_block = function (tokens, idx /*, options*/) {
  var token    = tokens[idx];

  return '<pre class="prettyprint">'
    + '<code>' + token.content + '</code>'
    + '</pre>';
};


exports.markdown = function (text) {
  return '<div class="markdown-text">' + md.render(text || '') + '</div>';
};