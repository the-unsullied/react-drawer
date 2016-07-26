/**
Component that opens and closes to show more content
@class Drawer Component
*/
import React from 'react';
import classnames from 'classnames';

function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export default React.createClass({

  getInitialState() {
    return {
      isOpen: !!this.props.isOpen,
      id: `drawer__body-${generateGuid()}`,
      height: null
    };
  },

  propTypes: {
    isOpen: React.PropTypes.bool,
    header: React.PropTypes.string
  },

  componentDidMount() {
    this.refs.drawer.addEventListener('transitionend', this.onTransitionEnd);
    if(this.state.isOpen) {
      this.onTransitionEnd();
      this.updateClassList(true);
      this.setState({ height: this.getHeight() });
    }
  },

  componentWillUnmount() {
    this.refs.drawer.removeEventListener('transitionend', this.onTransitionEnd);
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.isOpen !== nextProps.isOpen) {
      this.toggleDrawer();
    }
  },

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    const wasOpen = prevState.isOpen;
    if(isOpen !== wasOpen) {
      setTimeout(() => this.updateClassList(isOpen));
    }
  },

  getHeight() {
    const { drawer } = this.refs;
    const _cssText = drawer.style.cssText;
    drawer.style.cssText = 'visibility: hidden; position: absolute; height: auto';
    const height = `${drawer.offsetHeight}px`;
    drawer.style.cssText = _cssText;
    return height;
  },

  toggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen,
      height: this.getHeight()
    });
  },

  openClass: 'drawer__body--open',
  afterOpenClass: 'drawer__body--after-open',
  drawerHeaderOpenClass: 'drawer__header--open',

  updateClassList(isOpen) {
    const { drawer, drawerHeader } = this.refs;
    if(isOpen) {
      drawerHeader.classList.add(this.drawerHeaderOpenClass);
      drawer.classList.add(this.openClass);
    } else {
      drawer.classList.remove(this.afterOpenClass);
      // delay to allow css animation to execute properly
      setTimeout(() => drawer.classList.remove(this.openClass), 50);
    }
  },

  onTransitionEnd() {
    const { isOpen } = this.state;
    const { drawer, drawerHeader } = this.refs;
    if(isOpen) {
      drawer.classList.add(this.afterOpenClass);
    } else {
      drawerHeader.classList.remove(this.drawerHeaderOpenClass);
    }
  },

  renderStyle() {
    const { drawer } = this.refs;
    if(!drawer) { return; }
    const { id, height } = this.state;
    return <style>
      {`#${id}.${this.openClass} { height: ${height} }`}
    </style>
  },

  render() {
    const { isOpen, id } = this.state;
    return <div className="drawer">
      {this.renderStyle()}
      <div ref="drawerHeader" className='drawer__header'
           onClick={this.toggleDrawer}>
        <h2>{this.props.header}</h2>
        <i className={classnames({'icon-chevron-up': isOpen, 'icon-chevron-down': !isOpen})}></i>
      </div>
      <div className='drawer__body' id={id} ref="drawer">
        <div className="drawer__body-content">
          {this.props.children}
        </div>
      </div>
    </div>
  }
});
