"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setState = exports.setState = function setState(state) {
  return {
    type: "SET_STATE",
    state: state
  };
};
var setNewEvent = exports.setNewEvent = function setNewEvent(event) {
  return {
    type: "SET_NEWEVENT",
    event: event
  };
};