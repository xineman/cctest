'use strict';

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var md5 = require('md5');

mongoose.connect('mongodb://xineman:calendarTest@ds129333.mlab.com:29333/calendar', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to DB");
});
var Schema = mongoose.Schema;
var eventSchema = new Schema({ _id: Schema.Types.ObjectId, title: String, start: Number, duration: Number });
var userSchema = new Schema({ username: String, password: String, events: [eventSchema] });
var User = mongoose.model('User', userSchema);
var MongoStore = require('connect-mongo')(session);

//Development
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpack = require("webpack");
// const webpackConfig = require("../webpack.config");
// const compiler = webpack(webpackConfig);

// import model from './data'

var app = express();
// app.use(webpackDevMiddleware(compiler, {publicPath: "/js"}));
app.use(session({
  secret: 'eventxx',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('dist/public'));;

app.get("/", function (req, res) {
  var preloadedState = getInitialState();
  if (req.session.username) {
    preloadedState.username = req.session.username;
    User.findOne({ username: req.session.username }, function (err, user) {
      if (err) console.log("Db error");
      if (user) {
        preloadedState.events = user.events;
        preloadedState.layout = getLayout(user.events);
      }
      var store = (0, _redux.createStore)(_reducers2.default, preloadedState);
      var html = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_App2.default, null)
      ));
      var finalState = store.getState();
      res.send(renderFullPage(html, finalState));
    });
  } else {
    var store = (0, _redux.createStore)(_reducers2.default, preloadedState);
    var html = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_App2.default, null)
    ));
    var finalState = store.getState();
    res.send(renderFullPage(html, finalState));
  }
});
function getInitialState() {
  return {
    username: null,
    events: [],
    layout: null,
    newEvent: {
      title: "",
      start: "",
      end: ""
    }
  };
}
//generate layout for user events
function getLayout(allEvents) {
  var layout = [];

  var _loop = function _loop() {
    //540 minutes in day
    //filter events which are present at this minute
    var events = allEvents.filter(function (e) {
      return e.start <= i && e.start + e.duration - 1 >= i;
    });
    //if more than 1 event is present at this minute, create layout for all of them
    if (events.length > 1) {
      for (j = 0; j < events.length; j++) {
        //find layout for this event
        var evLayout = layout.find(function (l) {
          return l.id == events[j].id;
        });
        //if layout doesn't exist, or it is wider than needed, then create new layout
        if (!evLayout || evLayout.width > 1 / events.length) {
          layout = layout.filter(function (l) {
            return l.id != events[j].id;
          });
          layout.push({ id: events[j]._id, order: j, width: 1 / events.length });
        }
      }
    }
  };

  for (var i = 0; i < 540; i++) {
    var j;

    _loop();
  }
  return layout;
}
app.post("/login", function (req, res) {
  var username = req.body.username;
  var password = md5(req.body.password);
  User.findOne({
    username: username,
    password: password
  }, function (err, user) {
    if (err) console.log("DB error");else {
      if (user) {
        req.session.username = user.username;
        res.send({ username: user.username, events: user.events, layout: getLayout(user.events) });
      } else {
        res.send({ error: "Wrong credentials" });
      }
    }
  });
});

app.get("/logout", function (req, res) {
  delete req.session.username;
  res.redirect("/");
});

app.post("/register", function (req, res) {
  var username = req.body.username;
  var password = md5(req.body.password);
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) console.log("DB error");else {
      if (user) {
        res.send({ error: "Username is already used" });
      } else {
        var user = new User({ username: username, password: password });
        //save model to MongoDB
        user.save(function (err) {
          if (err) {
            return err;
          } else {
            req.session.username = user.username;
            res.send({ username: username });
          }
        });
      }
    }
  });
});
app.post("/add", function (req, res) {
  if (req.session && req.session.username) {
    var event = req.body.event;
    event._id = mongoose.Types.ObjectId();
    User.findOneAndUpdate({ username: req.session.username }, { $push: { events: req.body.event } }, { new: true }, function (err, user) {
      if (err) console.log(err);
      if (user) res.send(user.events);else res.redirect("/");
    });
  } else res.redirect("/");
});
app.post("/remove", function (req, res) {
  if (req.session && req.session.username) {
    User.findOneAndUpdate({ username: req.session.username }, { $pull: { events: { _id: req.body.removeId } } }, { new: true }, function (err, user) {
      if (err) console.log(err);
      if (user) res.send(user.events);else res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

app.get("/export", function (req, res) {
  if (req.session && req.session.username) {
    User.findOne({ username: req.session.username }, function (err, user) {
      if (err) console.log("Db error");
      if (user) {
        console.log(user);
        res.send(user.events.map(function (event) {
          return { start: event.start, duration: event.duration, title: event.title };
        }));
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});
app.listen(3000, function () {
  console.log("Listening on port 3000!");
});

//serverside rendering
function renderFullPage(html, preloadedState) {
  return '\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <meta charset="utf-8">\n        <!-- build:css -->\n        <link rel="stylesheet" href="css/styles.css">\n        <!-- endbuild -->\n        <title>Event Calendar</title>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n            // WARNING: See the following for security issues around embedding JSON in HTML:\n            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n            window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n        </script>\n        <!-- build:js -->\n        <script src="js/manifest.min.js" charset="utf-8"></script>\n        <script src="js/libs.min.js" charset="utf-8"></script>\n        <script src="js/main.min.js" charset="utf-8"></script>\n        <!-- endbuild -->\n      </body>\n    </html>\n  ';
}
