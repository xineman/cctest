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

var AddPopup = function (_React$Component) {
  _inherits(AddPopup, _React$Component);

  function AddPopup() {
    _classCallCheck(this, AddPopup);

    return _possibleConstructorReturn(this, (AddPopup.__proto__ || Object.getPrototypeOf(AddPopup)).apply(this, arguments));
  }

  _createClass(AddPopup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'popup add-popup', onClick: function onClick(e) {
            return _this2.props.close(e);
          } },
        _react2.default.createElement(
          'div',
          { className: 'popup__wrapper add-popup__wrapper' },
          _react2.default.createElement(
            'h3',
            { className: 'popup__title' },
            'New event'
          ),
          _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'form__block' },
              _react2.default.createElement(
                'label',
                { className: 'form__label' },
                'Title'
              ),
              _react2.default.createElement('input', { id: 'event__title', type: 'text', className: 'form__input', placeholder: 'Event title', onChange: function onChange(e) {
                  return _this2.props.change(e);
                }, value: this.props.newEvent.title })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form__block' },
              _react2.default.createElement(
                'label',
                { className: 'form__label' },
                'Start time:'
              ),
              _react2.default.createElement('input', { id: 'event__start', type: 'text', className: 'form__input', placeholder: '8:00', onChange: function onChange(e) {
                  return _this2.props.change(e);
                }, value: this.props.newEvent.start })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form__block' },
              _react2.default.createElement(
                'label',
                { className: 'form__label' },
                'End time:'
              ),
              _react2.default.createElement('input', { id: 'event__end', type: 'text', className: 'form__input', placeholder: '8:30', onChange: function onChange(e) {
                  return _this2.props.change(e);
                }, value: this.props.newEvent.end })
            ),
            _react2.default.createElement(
              'div',
              { className: 'popup__buttons' },
              _react2.default.createElement(
                'p',
                { className: 'header__btn', onClick: function onClick() {
                    return _this2.props.create();
                  } },
                'Create'
              ),
              _react2.default.createElement(
                'p',
                { className: 'header__btn popup__close' },
                'Cancel'
              )
            )
          )
        )
      );
    }
  }]);

  return AddPopup;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { newEvent: state.newEvent };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    create: function create() {
      var start = ownProps.newEvent.start.split(":");
      start = (parseInt(start[0]) - 8) * 60 + parseInt(start[1]);
      var end = ownProps.newEvent.end.split(":");
      end = (parseInt(end[0]) - 8) * 60 + parseInt(end[1]);
      if (isNaN(start) || isNaN(end) || end < start) {
        alert("Check your fields and try again!");
      } else {
        (0, _utils.ajax)('http://' + window.location.host + '/add', "POST", {
          event: {
            title: ownProps.newEvent.title,
            start: start,
            duration: end - start
          }
        }).then(function (response) {
          dispatch((0, _actions.setState)({ showAddPopup: false, events: JSON.parse(response) }));
        });
      }
    },
    change: function change(e) {
      switch (e.target.id) {
        case "event__title":
          dispatch((0, _actions.setNewEvent)({ title: e.target.value }));
          break;
        case "event__start":
          dispatch((0, _actions.setNewEvent)({ start: e.target.value }));
          break;
        case "event__end":
          dispatch((0, _actions.setNewEvent)({ end: e.target.value }));
          break;
        default:

      }
    },
    close: function close(e) {
      if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) dispatch((0, _actions.setState)({ showAddPopup: false }));
    }
  };
};
var AddPopupContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddPopup);
exports.default = AddPopupContainer;