import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';

class LoginField extends Component {
  render() {
    return (
      <fieldset>
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
          buttonFunction={ this.handleSubmit }
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
    );
  }
}

export default LoginField;
