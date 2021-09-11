import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      className,
      dataTest,
      inputType,
      inputName,
      inputValue,
      inputPlaceholder,
      inputFunction,
    } = this.props;
    return (
      <input
        onChange={ inputFunction }
        data-testid={ dataTest }
        type={ inputType }
        placeholder={ inputPlaceholder }
        value={ inputValue }
        name={ inputName }
        className={ className }
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputFunction: PropTypes.func.isRequired,
};

export default Input;
