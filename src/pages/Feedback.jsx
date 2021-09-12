import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playAgain as playAgainAction } from '../redux/actions';
import PlayerHeader from '../components/PlayerHeader';
import styles from '../css/Feedback.module.css';

class FeedBack extends React.Component {
  constructor() {
    super();

    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.getRankingPage = this.getRankingPage.bind(this);
  }

  getRankingPage() {
    const { history } = this.props;

    history.push('/ranking');
  }

  handlePlayAgain() {
    const { history, playAgain } = this.props;
    playAgain();

    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const limiar = 3;
    const messageText = assertions >= limiar ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <div>
        <div className={ styles.headerFeed }>
          <PlayerHeader />
        </div>
        <p data-testid="feedback-text">{ messageText }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p> Pontuação Final </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <button
          onClick={ this.handlePlayAgain }
          data-testid="btn-play-again"
          type="button"
        >
          Jogar Novamente
        </button>
        <button
          onClick={ this.getRankingPage }
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  playAgain: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

const mapDispatchToProps = (dispatch) => ({
  playAgain: (playerInfo) => dispatch(playAgainAction(playerInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
