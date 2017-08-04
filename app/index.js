const express = require("express");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const md5 = require('md5');

mongoose.connect('mongodb://xineman:calendarTest@ds129333.mlab.com:29333/calendar', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to DB");
});
var Schema = mongoose.Schema;
var eventSchema = new Schema({_id: Schema.Types.ObjectId, title: String, start: Number, duration: Number});
var userSchema = new Schema({username: String, password: String, events: [eventSchema]});
var User = mongoose.model('User', userSchema);
const MongoStore = require('connect-mongo')(session);

//Development
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpack = require("webpack");
// const webpackConfig = require("../webpack.config");
// const compiler = webpack(webpackConfig);

import {renderToString} from 'react-dom/server'
import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import chatApp from './reducers'
import App from './components/App'
// import model from './data'

var app = express();
// app.use(webpackDevMiddleware(compiler, {publicPath: "/js"}));
app.use(session({
  secret: 'eventxx',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('app/public'));;

app.get("/", (req, res) => {
  let preloadedState = getInitialState();
  if (req.session.username) {
    preloadedState.username = req.session.username;
    User.findOne({username: req.session.username}, function(err, user) {
      if (err)
        console.log("Db error");
      if (user) {
        preloadedState.events = user.events;
        preloadedState.layout = getLayout(user.events);
      }
      const store = createStore(chatApp, preloadedState)
      const html = renderToString(
        <Provider store={store}>
          <App/>
        </Provider>
      )
      const finalState = store.getState();
      res.send(renderFullPage(html, finalState));
    });
  } else {
    const store = createStore(chatApp, preloadedState)
    const html = renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
    )
    const finalState = store.getState();
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
  }
}
//generate layout for user events
function getLayout(allEvents) {
  let layout = [];
  for (var i = 0; i < 540; i++) {//540 minutes in day
    //filter events which are present at this minute
    let events = allEvents.filter(e=>e.start<=i && e.start+e.duration-1>=i);
    //if more than 1 event is present at this minute, create layout for all of them
    if (events.length>1) {
      for (var j = 0; j < events.length; j++) {
        //find layout for this event
        let evLayout = layout.find(l => l.id==events[j].id);
        //if layout doesn't exist, or it is wider than needed, then create new layout
        if (!evLayout || evLayout.width > 1/events.length) {
          layout = layout.filter(l => l.id!=events[j].id);
          layout.push({id:events[j]._id, order: j, width:1/events.length});
        }
      }
    }
  }
  return layout;
}
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  User.findOne({
    username,
    password
  }, function(err, user) {
    if (err)
      console.log("DB error");
    else {
      if (user) {
        req.session.username = user.username;
        res.send({username: user.username, events: user.events, layout: getLayout(user.events)});
      } else {
        res.send({error: "Wrong credentials"});
      }
    }
  })

});

app.get("/logout", (req, res) => {
  delete req.session.username;
  res.redirect("/");
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  User.findOne({
    username
  }, function(err, user) {
    if (err)
      console.log("DB error");
    else {
      if (user) {
        res.send({error: "Username is already used"});
      } else {
        var user = new User({username, password});
        //save model to MongoDB
        user.save(function (err) {
          if (err) {
            return err;
          }
          else {
            req.session.username = user.username;
            res.send({username});
          }
        });
      }
    }
  })
});
app.post("/add", (req, res) => {
  if (req.session && req.session.username) {
    let event = req.body.event;
    event._id = mongoose.Types.ObjectId();
    User.findOneAndUpdate({username: req.session.username}, {$push: {events: req.body.event}}, {new: true}, function(err, user) {
      if (err) console.log(err);
      if (user)
        res.send(user.events);
      else
        res.redirect("/");
    });
  } else
    res.redirect("/");
});
app.post("/remove", (req, res) => {
  if (req.session && req.session.username) {
    User.findOneAndUpdate({username: req.session.username}, {$pull: {events: {_id: req.body.removeId}}}, {new: true}, function(err, user) {
      if (err) console.log(err);
      if (user)
        res.send(user.events);
      else
        res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

app.get("/export", (req, res) => {
  if (req.session && req.session.username) {
    User.findOne({username: req.session.username}, function(err, user) {
      if (err)
      console.log("Db error");
      if (user) {
        console.log(user);
        res.send(user.events.map(event => ({ start: event.start, duration: event.duration, title: event.title})));
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");

  }
});
app.listen(3000, function() {
  console.log("Listening on port 3000!");
});

//serverside rendering
function renderFullPage(html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <!-- build:css -->
        <link rel="stylesheet" href="css/styles.css">
        <!-- endbuild -->
        <title>Event Calendar</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <!-- build:js -->
        <script src="js/manifest.min.js" charset="utf-8"></script>
        <script src="js/libs.min.js" charset="utf-8"></script>
        <script src="js/main.min.js" charset="utf-8"></script>
        <!-- endbuild -->
      </body>
    </html>
  `
}
