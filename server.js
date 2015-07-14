var express = require('express');
var app = express();
var sessions = require('express-sessions');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./models/user.js');

app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(session({

  secret: 'super secret',
  resave: false,
  saveUninitialize: true
  cookie: {maxAge: 6000}
}));

//routes
app.get('/login', function (req, res){
  var html = '<form action="/api/sessions" method="post">' +
               'Your email: <input type="text" name="email"><br>' +
               'Your password: <input type="text" name="password"><br>' +
               '<button type="submit">Submit</button>' +
               '</form>';
  if (req.session.user) {
    html += '<br>Your email from your session is: ' + req.session.user.email;
  }
  console.log(req.session);
  res.send(html);
})

app.post('/api/sessions', function (req, res) {
  User.authenticate(req.body.email, req.body.password, function(error, user) {
    req.session.user = user;
    res.redirect('/login');
  });
});

app.listen(3000, function(){
console.log('server 3000 started!');
});

