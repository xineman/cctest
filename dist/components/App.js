'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _SignedInMenu = require('../components/SignedInMenu');

var _SignedInMenu2 = _interopRequireDefault(_SignedInMenu);

var _LoginForm = require('../components/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _Calendar = require('../components/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _RemovePopup = require('../components/RemovePopup');

var _RemovePopup2 = _interopRequireDefault(_RemovePopup);

var _AddPopup = require('../components/AddPopup');

var _AddPopup2 = _interopRequireDefault(_AddPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(
          'header',
          { className: 'header' },
          _react2.default.createElement(
            'h1',
            { className: 'header__title' },
            'Calendar'
          ),
          this.props.username && _react2.default.createElement(_SignedInMenu2.default, { events: this.props.events })
        ),
        this.props.username && _react2.default.createElement(
          'p',
          { className: 'header__descr' },
          'Click "Add" to add new event, "Export" to export all your events as JSON, or click the event to remove it.'
        ),
        this.props.username && _react2.default.createElement(_Calendar2.default, { events: this.props.events }),
        !this.props.username && _react2.default.createElement(_LoginForm2.default, null),
        this.props.showRemovePopup && _react2.default.createElement(_RemovePopup2.default, { removeId: this.props.removeId }),
        this.props.showAddPopup && _react2.default.createElement(_AddPopup2.default, { newEvent: this.props.newEvent })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    username: state.username,
    events: state.events,
    showRemovePopup: state.showRemovePopup,
    showAddPopup: state.showAddPopup,
    removeId: state.removeId,
    newEvent: state.newEvent
  };
};
var AppContainer = (0, _reactRedux.connect)(mapStateToProps)(App);
exports.default = AppContainer;