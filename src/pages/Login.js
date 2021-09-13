import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginSubmit as loginSubmitAction,
  fetchToken as fetchTokenAction } from '../redux/actions';

import logo from '../trivia.png';
import styles from '../css/Login.module.css';
import Input from '../components/Input';
import Button from '../components/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      enableButton: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDisabledButton = this.handleDisabledButton.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleConfigClick = this.handleConfigClick.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.handleDisabledButton());
  }

  handleDisabledButton() {
    const { email, name } = this.state;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

    this.setState({
      enableButton: validEmail.test(email) && name.length > 0,
    });
  }

  handlePlayClick() {
    const { history, loginSubmit, fetchToken, assertions, score, img } = this.props;
    const { name, email } = this.state;

    fetchToken();
    loginSubmit(name, email);

    const state = { player: { name, assertions, score, gravatarEmail: img } };
    localStorage.setItem('state', JSON.stringify(state));

    if (localStorage.getItem('ranking') === null) {
      const ranking = [];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    history.push('/triviagame');
  }

  handleConfigClick() {
    const { history } = this.props;

    history.push('/settings');
  }

  renderLogin() {
    const { name, email, enableButton } = this.state;
    return (
      <div>
        <div className="App">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <fieldset className={ styles.loginField }>
          <Input
            className={ styles.loginName }
            dataTest="input-player-name"
            inputType="text"
            inputName="name"
            inputPlaceholder="Nome"
            inputValue={ name }
            inputFunction={ this.handleChange }
          />
          <Input
            className={ styles.loginEmail }
            dataTest="input-gravatar-email"
            inputType="email"
            inputName="email"
            inputPlaceholder="E-mail"
            inputValue={ email }
            inputFunction={ this.handleChange }
          />
          <Button
            className={ styles.buttonPlay }
            dataTest="btn-play"
            buttonFunction={ this.handlePlayClick }
            isDisabled={ enableButton ? undefined : true }
            buttonText="Jogar"
          />
          <Button
            className={ styles.buttonPlay }
            dataTest="btn-settings"
            buttonFunction={ this.handleConfigClick }
            buttonText="Configurações"
          />
        </fieldset>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderLogin() }
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
