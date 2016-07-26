'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Component that opens and closes to show more content
@class Drawer Component
*/
function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return '' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.default = _react2.default.createClass({
  getInitialState: function getInitialState() {
    return {
      isOpen: !!this.props.isOpen,
      id: 'drawer__body-' + generateGuid(),
      height: null
    };
  },


  propTypes: {
    isOpen: _react2.default.PropTypes.bool,
    header: _react2.default.PropTypes.string
  },

  componentDidMount: function componentDidMount() {
    this.refs.drawer.addEventListener('transitionend', this.onTransitionEnd);
    if (this.state.isOpen) {
      this.onTransitionEnd();
      this.updateClassList(true);
      this.setState({ height: this.getHeight() });
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.refs.drawer.removeEventListener('transitionend', this.onTransitionEnd);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.toggleDrawer();
    }
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    var isOpen = this.state.isOpen;

    var wasOpen = prevState.isOpen;
    if (isOpen !== wasOpen) {
      setTimeout(function () {
        return _this.updateClassList(isOpen);
      });
    }
  },
  getHeight: function getHeight() {
    var drawer = this.refs.drawer;

    var _cssText = drawer.style.cssText;
    drawer.style.cssText = 'visibility: hidden; position: absolute; height: auto';
    var height = drawer.offsetHeight + 'px';
    drawer.style.cssText = _cssText;
    return height;
  },
  toggleDrawer: function toggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen,
      height: this.getHeight()
    });
  },


  openClass: 'drawer__body--open',
  afterOpenClass: 'drawer__body--after-open',
  drawerHeaderOpenClass: 'drawer__header--open',

  updateClassList: function updateClassList(isOpen) {
    var _this2 = this;

    var _refs = this.refs;
    var drawer = _refs.drawer;
    var drawerHeader = _refs.drawerHeader;

    if (isOpen) {
      drawerHeader.classList.add(this.drawerHeaderOpenClass);
      drawer.classList.add(this.openClass);
    } else {
      drawer.classList.remove(this.afterOpenClass);
      // delay to allow css animation to execute properly
      setTimeout(function () {
        return drawer.classList.remove(_this2.openClass);
      }, 50);
    }
  },
  onTransitionEnd: function onTransitionEnd() {
    var isOpen = this.state.isOpen;
    var _refs2 = this.refs;
    var drawer = _refs2.drawer;
    var drawerHeader = _refs2.drawerHeader;

    if (isOpen) {
      drawer.classList.add(this.afterOpenClass);
    } else {
      drawerHeader.classList.remove(this.drawerHeaderOpenClass);
    }
  },
  renderStyle: function renderStyle() {
    var drawer = this.refs.drawer;

    if (!drawer) {
      return;
    }
    var _state = this.state;
    var id = _state.id;
    var height = _state.height;

    return _react2.default.createElement(
      'style',
      null,
      '#' + id + '.' + this.openClass + ' { height: ' + height + ' }'
    );
  },
  render: function render() {
    var _state2 = this.state;
    var isOpen = _state2.isOpen;
    var id = _state2.id;

    return _react2.default.createElement(
      'div',
      { className: 'drawer' },
      this.renderStyle(),
      _react2.default.createElement(
        'div',
        { ref: 'drawerHeader', className: 'drawer__header',
          onClick: this.toggleDrawer },
        _react2.default.createElement(
          'h2',
          null,
          this.props.header
        ),
        _react2.default.createElement('i', { className: (0, _classnames2.default)({ 'unsullied-icon-chevron-up': isOpen, 'unsullied-icon-chevron-down': !isOpen }) })
      ),
      _react2.default.createElement(
        'div',
        { className: 'drawer__body', id: id, ref: 'drawer' },
        _react2.default.createElement(
          'div',
          { className: 'drawer__body-content' },
          this.props.children
        )
      )
    );
  }
});
module.exports = exports['default'];
