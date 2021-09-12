import React, { Component } from 'react';

class RankingScreen extends Component {
  render() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        {localRanking.sort((a, b) => b.score - a.score).map((rank, index) => (
          <div key={ index }>
            <img src={ rank.picture } alt="rank" />
            <p data-testid={ `player-score-${index}` }>
              Score:
              { rank.score }
            </p>
            <p data-testid={ `player-name-${index}` }>
              { rank.name }
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default RankingScreen;
