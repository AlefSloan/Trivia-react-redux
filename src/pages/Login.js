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
    this.handleConfigClick = this.handleConfigClick.bind(this);
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
    const { history, loginSubmit, fetchToken, assertions, score, img } = this.props;
    const { name, email } = this.state;
    const gravatarEmail = img;

    fetchToken();
    loginSubmit(name, email);

    const state = { player: { name, assertions, score, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(state));
    history.push('/triviagame');
  }

  handleConfigClick() {
    const { history } = this.props;

    history.push('/settings');
  }

  render() {
    const { name, email, enableButton } = this.state;
    return (
      <div>
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
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleConfigClick }
          >
            Configurações
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
  img: player.img,
});

const mapDispatchToProps = (dispatch) => ({
  loginSubmit: (payload1, payload2) => dispatch(loginSubmitAction(payload1, payload2)),
  fetchToken: () => dispatch(fetchTokenAction()),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
