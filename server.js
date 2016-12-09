const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const ppr = require('./routes/ppr');
const standard = require('./routes/standard');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');
// const auction = require('./routes/auction');
// const assert = require('chai').assert;
const FFNerd = require('fantasy-football-nerd');



auth.setup();

const sessionConfig = {
  secret: 'super secret key goes here', // TODO this should be read from ENV
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false
  }
};


// auth.setup();

const app = express();


app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
// app.use('/auction', auction);
app.use('/ppr', ppr);
app.use('/standard', standard)

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// everything beyond this point must be authenticated
app.use(ensureAuthenticated);

app.get('/supersecret', function(req, res){
  res.send('the password is banana');
});

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Listening on port', server.address().port);
});
