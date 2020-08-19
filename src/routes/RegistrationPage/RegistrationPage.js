import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  //   handleLoginSuccess = () => {
  //     const { location, history } = this.props
  //     const destination = (location.state || {}).from || '/dashboard'
  //     history.push(destination)
  //   }

  render() {
    return (
      <section className="RegistrationPage">
        <h2>Login</h2>
        <RegistrationForm
        //   onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}
