import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginSubmit as loginSubmitAction,
  fetchToken as fetchTokenAction } from '../redux/actions';

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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    const { history, loginSubmit, fetchToken } = this.props;
    const { name } = this.state;

    fetchToken();
    loginSubmit(name);
    history.push('/triviagame');
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
          onClick={ this.handleSubmit }
          disabled={ enableButton ? undefined : true }
        >
          Jogar
        </button>
      </fieldset>
    );
  }
}

Login.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({

  loginSubmit: (name) => dispatch(loginSubmitAction(name)),
  fetchToken: () => dispatch(fetchTokenAction()),
}
);

export default connect(null, mapDispatchToProps)(Login);
