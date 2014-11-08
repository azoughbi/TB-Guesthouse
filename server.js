var express = require('express'),
	director = require('director'),
	http = require('http'),
	path = require('path');

var app = express();

var indexPage = function () {
	this.res.status(200).render('login', {'title': 'TalentBuddy Home'})
}, 
loginPage = function () {
	this.res.status(200).render('login', {'title': 'Login'})
},

registerPage = function () {
	this.res.status(200).render('register', {'title': 'Register'})
};

var router = new director.http.Router({
	'/': {
		get: indexPage
	},
	'/login': {
		get: loginPage
	},
	'/register': {
		get: registerPage
	}
});

var middleware = function (req, res, next) {
  router.dispatch(req, res, function (err) {
    if (err == undefined || err) next();
  });
};

var pub = __dirname;
app.use(express.static(pub));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(middleware);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express app started on port %d', 30000);
});

app.listen(30000);