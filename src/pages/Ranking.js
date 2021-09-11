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
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <div>
          <h2 data-testid="ranking-title">Tela de Ranking</h2>
        </div>
        <div>
          {localRanking.sort((a, b) => b.score - a.score).map((rank, index) => (
            <div key={ index }>
              <img src={ rank.picture } alt="rank" />
              <p data-testid={ `player-score-${index}` }>
                Score:
                { rank.score }
              </p>
              <p data-testid={ `player-name-${index}` }>
                Name:
                { rank.name }
              </p>
            </div>
          ))}
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
