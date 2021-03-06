'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _utils = require('../utils.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignedInMenu = function (_React$Component) {
  _inherits(SignedInMenu, _React$Component);

  function SignedInMenu() {
    _classCallCheck(this, SignedInMenu);

    return _possibleConstructorReturn(this, (SignedInMenu.__proto__ || Object.getPrototypeOf(SignedInMenu)).apply(this, arguments));
  }

  _createClass(SignedInMenu, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'nav',
        { className: 'header__nav' },
        _react2.default.createElement(
          'p',
          { className: 'header__btn', onClick: function onClick() {
              return _this2.props.export();
            } },
          'Export'
        ),
        _react2.default.createElement(
          'p',
          { className: 'header__btn', onClick: function onClick() {
              return _this2.props.add();
            } },
          'Add'
        ),
        _react2.default.createElement(
          'p',
          { className: 'header__btn', onClick: function onClick() {
              return _this2.props.logout();
            } },
          'Logout'
        )
      );
    }
  }]);

  return SignedInMenu;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    logout: function logout() {
      window.location.replace("/logout");
    },
    export: function _export() {
      window.location.href = "/export";
    },
    add: function add() {
      dispatch((0, _actions.setState)({ showAddPopup: true }));
    }
  };
};
var SignedInMenuContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(SignedInMenu);
exports.default = SignedInMenuContainer;