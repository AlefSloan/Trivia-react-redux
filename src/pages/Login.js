import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { loginSubmit as loginSubmitAction } from '../redux/actions';

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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const { loginSubmit } = this.props;
    const { name, email } = this.state;
    loginSubmit(name, email);
  }

  render() {
    const { name, email, enableButton } = this.state;
    return (
      <div>
        <Header />
        <fieldset>
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            placeholder="Nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
            disabled={ enableButton ? undefined : true }
          >
            Jogar
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginSubmit: (payload1, payload2) => dispatch(loginSubmitAction(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(Login);
