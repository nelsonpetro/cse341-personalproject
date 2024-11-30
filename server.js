const express = require('express');
const mongodb = require('./db/database');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(express.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }))
  .use('/', require('./routes/index'));

passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  const _db = mongodb.getDb().db();
  _db.collection('users')
    .findOne({ githubId: profile.id })
    .then(user => {
      if (!user) {
        const newUser = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
        };
        return _db.collection('users').insertOne(newUser).then(() => newUser);
      }
      return user;
    })
    .then(user => done(null, user))
    .catch(err => {
      console.error('Error accessing database:', err);
      return done(err);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});

// app.listen(port, () => (console.log(`running on port ${port}`)));
//sudo lsof -i tcp:3000
//kill process in port already in use
