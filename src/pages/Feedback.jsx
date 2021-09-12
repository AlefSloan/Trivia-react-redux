import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { playAgain as playAgainAction } from '../redux/actions';

import PlayerHeader from '../components/PlayerHeader';
import styles from '../css/Feedback.module.css';
import Button from '../components/Button';

class FeedBack extends React.Component {
  constructor() {
    super();

    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.getRankingPage = this.getRankingPage.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);
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

  renderFeedback() {
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
        <Button
          buttonFunction={ this.handlePlayAgain }
          className="play-again-button"
          dataTest="btn-play-again"
          buttonText="Jogar Novamente"
        />
        <Button
          buttonFunction={ this.getRankingPage }
          className="ranking-page-button"
          dataTest="btn-ranking"
          buttonText="Ver Ranking"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderFeedback() }
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
