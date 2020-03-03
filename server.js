const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const passport = require('passport');
const db = require("./app/models");
const session = require("express-session");

var corsOptions = {
    origin: "http://localhost:4200",
    header: "*",
    credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitilized: true,
    cookie: { secure: false }
}));

// Passport.js

app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username, password, done) {
    db.user.findOne({
      where: { email: username }
    }).then(function (user) {
      if (!user) {
        return done('user not found', false);
      }

      if (user.password != password) {
        return done('password is not correct', false);
      }
      return done(null, user);
    });
  }
));

const auth = () => {
  return (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) res.status(400).json({ "statusCode": 400, "message": error })
      req.login(user, function (error) {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  }
};

app.post('/authenticate', auth(), (req, res) => {
  res.status(200).json({user: req.user});
});

passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user.user_id)
    }
    // done(false);
});

passport.deserializeUser(function (id, done) {
  console.log(id);
  db.user.findOne({ where: { user_id: id } })
    .then(function (user) {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(function(e) {
      done(e);
    });
});

const isLoggedIn = (req, res, next) => {
    if ( req.path === "/api/user" || req.path === "/api/user/exist-email" || req.path === "/api/announcement/published" || req.isAuthenticated()) {
        return next()
    }
    return res.status(401).json({"statusCode": 401, "message": "not authenticated"})
};

app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.send();
});

app.use(isLoggedIn);
// an

// Add headers
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });


// db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to application." });
// });

require("./app/routes/announcement.routes")(app);
require("./app/routes/sections.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/images.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
