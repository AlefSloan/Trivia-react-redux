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
      buttonId,
    } = this.props;
    return (
      <button
        type="button"
        id={ buttonId }
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
  buttonId: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  buttonId: null,
};

export default Button;
