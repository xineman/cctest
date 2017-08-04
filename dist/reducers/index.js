"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  username: null,
  events: [{
    id: "0",
    title: "My first event!",
    start: "1",
    duration: "1"
  }],
  layout: null,
  newEvent: {
    title: "",
    start: "",
    end: ""
  }
};

function calendarApp() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case "SET_STATE":
      return _extends({}, state, action.state);
    case "SET_NEWEVENT":
      return _extends({}, state, { newEvent: _extends({}, state.newEvent, action.event) });
  }
  return state;
}

exports.default = calendarApp;