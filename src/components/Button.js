import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      buttonText,
      className,
      dataTest,
      buttonFunction,
      isDisabled,
    } = this.props;
    return (
      <button
        type="button"
        className={ className }
        data-testid={ dataTest }
        onClick={ buttonFunction }
        disabled={ isDisabled }
      >
        { buttonText }
      </button>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  buttonFunction: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
