'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    return _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).apply(this, arguments));
  }

  _createClass(LoginForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'form',
        { className: 'form' },
        _react2.default.createElement(
          'div',
          { className: 'form__block' },
          _react2.default.createElement(
            'label',
            { className: 'form__label', htmlFor: 'username' },
            'Username:'
          ),
          _react2.default.createElement('input', { className: 'form__input', id: 'username', type: 'text', placeholder: 'Enter username' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form__block' },
          _react2.default.createElement(
            'label',
            { className: 'form__label', htmlFor: 'password' },
            'Password:'
          ),
          _react2.default.createElement('input', { className: 'form__input', id: 'password', type: 'password', placeholder: 'Enter password' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'popup__buttons' },
          _react2.default.createElement(
            'p',
            { className: 'form__button header__btn', onClick: function onClick() {
                return _this2.props.sign();
              } },
            'Login'
          ),
          _react2.default.createElement(
            'p',
            { className: 'form__text' },
            'or'
          ),
          _react2.default.createElement(
            'p',
            { className: 'form__button header__btn', onClick: function onClick() {
                return _this2.props.sign(true);
              } },
            'Register'
          )
        )
      );
    }
  }]);

  return LoginForm;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    sign: function sign(register) {
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      var url = 'http://' + window.location.host + '/login';
      if (register) url = 'http://' + window.location.host + '/register';
      (0, _utils.ajax)(url, "POST", { username: username, password: password }).then(function (response) {
        var message = JSON.parse(response);
        if (!message.error) dispatch((0, _actions.setState)(message));else {
          alert(message.error);
        }
      }).catch(function (error) {
        return console.log(error);
      });
    }
  };
};
var LoginFormContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(LoginForm);
exports.default = LoginFormContainer;