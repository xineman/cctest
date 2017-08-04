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

var RemovePopup = function (_React$Component) {
  _inherits(RemovePopup, _React$Component);

  function RemovePopup() {
    _classCallCheck(this, RemovePopup);

    return _possibleConstructorReturn(this, (RemovePopup.__proto__ || Object.getPrototypeOf(RemovePopup)).apply(this, arguments));
  }

  _createClass(RemovePopup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'popup remove-popup', onClick: function onClick(e) {
            return _this2.props.close(e);
          } },
        _react2.default.createElement(
          'div',
          { className: 'popup__wrapper remove-popup__wrapper' },
          _react2.default.createElement(
            'h3',
            { className: 'popup__title' },
            'Remove event?'
          ),
          _react2.default.createElement(
            'div',
            { className: 'popup__buttons' },
            _react2.default.createElement(
              'p',
              { className: 'header__btn', onClick: function onClick() {
                  return _this2.props.remove();
                } },
              'Remove'
            ),
            _react2.default.createElement(
              'p',
              { className: 'header__btn popup__close' },
              'Cancel'
            )
          )
        )
      );
    }
  }]);

  return RemovePopup;
}(_react2.default.Component);
// const mapStateToProps = state => {
//   return {
//     events: state.events,
//     layout: state.layout
//   }
// }

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    remove: function remove() {
      (0, _utils.ajax)('http://' + window.location.host + '/remove', "POST", { removeId: ownProps.removeId }).then(function (response) {
        dispatch((0, _actions.setState)({ removeId: null, showRemovePopup: false, events: JSON.parse(response) }));
      });
    },
    close: function close(e) {
      if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) dispatch((0, _actions.setState)({ removeId: null, showRemovePopup: false }));
    }
  };
};
var RemovePopupContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(RemovePopup);
exports.default = RemovePopupContainer;