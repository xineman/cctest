'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
  }

  _createClass(Calendar, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.events != this.props.events) this.props.setupLayout(nextProps.events);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'article',
        { className: 'calendar' },
        _react2.default.createElement(
          'ul',
          { className: 'calendar__timeline' },
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '8:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '8:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '9:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '9:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '10:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '10:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '11:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '11:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '12:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '12:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '1:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '1:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '2:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '2:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '3:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '3:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time' },
            '4:00'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_small' },
            '4:30'
          ),
          _react2.default.createElement(
            'li',
            { className: 'calendar__time calendar__time_last' },
            '5:00'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'calendar__events-container' },
          _react2.default.createElement(
            'ul',
            { className: 'calendar__hours' },
            _react2.default.createElement('li', { className: 'calendar__hour' }),
            _react2.default.createElement('li', { className: 'calendar__hour' }),
            _react2.default.createElement('li', { className: 'calendar__hour' })
          ),
          _react2.default.createElement(
            'ul',
            { className: 'calendar__events' },
            this.props.layout && this.props.events.map(function (e) {
              return _react2.default.createElement(_Event2.default, { key: e._id, duration: e.duration, start: e.start, title: e.title, _id: e._id });
            })
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    events: state.events,
    layout: state.layout
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    // eventClick: (id) => {
    //   ajax(`http://${window.location.host}/remove`, "POST", {removeId: id}).then((response) => {
    //     dispatch(setState({events: JSON.parse(response)}));
    //   });
    // },
    setupLayout: function setupLayout(allEvents) {
      var layout = [];

      var _loop = function _loop() {
        //540 minutes in day
        var events = allEvents.filter(function (e) {
          return e.start <= i && e.start + e.duration - 1 >= i;
        });
        if (events.length > 1) {
          for (j = 0; j < events.length; j++) {
            var evLayout = layout.find(function (l) {
              return l.id == events[j]._id;
            });
            if (!evLayout || evLayout.width > 1 / events.length) {
              layout = layout.filter(function (l) {
                return l.id != events[j]._id;
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
      dispatch((0, _actions.setState)({ layout: layout }));
    }
  };
};
var CalendarContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Calendar);
exports.default = CalendarContainer;