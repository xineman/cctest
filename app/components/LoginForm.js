import React from 'react';
import {connect} from 'react-redux'
import {setState} from "../actions";
import {ajax} from "../utils";
class LoginForm extends React.Component {
  render() {
    return (
      <form className="form">
        <div className="form__block">
          <label className="form__label" htmlFor="username">Username:</label>
          <input className="form__input" id="username" type="text" placeholder="Enter username"></input>
        </div>
        <div className="form__block">
          <label className="form__label" htmlFor="password">Password:</label>
          <input className="form__input" id="password" type="password" placeholder="Enter password"></input>
        </div>
        <div className="popup__buttons">
          <p className="form__button header__btn" onClick={() => this.props.sign()}>Login</p>
          <p className="form__text">or</p>
          <p className="form__button header__btn" onClick={() => this.props.sign(true)}>Register</p>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sign: (register) => {
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      let url = `http://${window.location.host}/login`;
      if (register)
        url = `http://${window.location.host}/register`;
      ajax(url, "POST", {username, password}).then((response)=>{
        let message = JSON.parse(response);
        if (!message.error)
          dispatch(setState(message));
          else {
            alert(message.error);
          }
      }).catch((error)=>console.log(error));
    }
  }
}
const LoginFormContainer = connect(null, mapDispatchToProps)(LoginForm);
export default LoginFormContainer;
