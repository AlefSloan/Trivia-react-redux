import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      enableButton: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    this.handleButton();
  }

  handleButton() {
    const { email, name } = this.state;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const verifyEmail = emailCheck.test(email);
    const isValid = verifyEmail && name.length > 0;
    this.setState({
      enableButton: isValid,
    });
  }

  render() {
    const { name, email, enableButton } = this.state;

    return (
      <fieldset>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          onClick={ () => {} }
          disabled={ enableButton ? true : undefined }
        >
          Jogar
        </button>
      </fieldset>
    );
  }
}

export default Login;
