import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { playAgain as playAgainAction } from '../redux/actions';

import Button from '../components/Button';
import RankingScreen from '../components/RankingScreen';

class Ranking extends Component {
  constructor() {
    super();

    this.goHomeHandler = this.goHomeHandler.bind(this);
  }

  goHomeHandler() {
    const { history, playAgain } = this.props;

    playAgain();

    history.push('/');
  }

  render() {
    return (
      <div>
        <div>
          <h2 data-testid="ranking-title">Tela de Ranking</h2>
        </div>
        <RankingScreen />
        <div>
          <Button
            buttonFunction={ this.goHomeHandler }
            className="go-home-button"
            dataTest="btn-go-home"
            buttonText="Tela inicial"
          />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  playAgain: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playAgain: (playerInfo) => dispatch(playAgainAction(playerInfo)),
});

export default connect(null, mapDispatchToProps)(Ranking);
