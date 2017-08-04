import {connect} from 'react-redux';
import {setState} from "../actions";
import {ajax} from '../utils.js';
import React from 'react';
class SignedInMenu extends React.Component {
  render() {
    return (
      <nav className="header__nav">
        <p className="header__btn" onClick={() => this.props.export()}>Export</p>
        <p className="header__btn" onClick={() => this.props.add()}>Add</p>
        <p className="header__btn" onClick={() => this.props.logout()}>Logout</p>
      </nav>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      window.location.replace("/logout");
    },
    export: () => {
      window.location.href = "/export";
    },
    add: () => {
      dispatch(setState({showAddPopup: true}));
    }
  }
}
const SignedInMenuContainer = connect(null, mapDispatchToProps)(SignedInMenu);
export default SignedInMenuContainer;
