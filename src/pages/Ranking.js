import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.goHomeHandler = this.goHomeHandler.bind(this);
  }

  goHomeHandler() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    return (
      <div>
        <div>
          <h2 data-testid="ranking-title">Tela de Ranking</h2>
        </div>
        <div>
          <button
            onClick={ this.goHomeHandler }
            data-testid="btn-go-home"
            type="button"
          >
            Tela inicial
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
