import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitAnswer as submitAnswerAction } from '../redux/actions';
import { shuffledAnswers, calculateScore } from '../services/index';
import PlayerHeader from '../components/PlayerHeader';
import '../App.css';
import styles from '../css/TriviaGame.module.css';
import Question from '../components/Question';
import Button from '../components/Button';
import CorrectSound from '../audio/Correct.wav';
import WrongSound from '../audio/Wrong.wav';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      quest: 0,
      isEnable: false,
      timer: 30,
      answered: false,
      isTiming: true,
      isPlaying: false,
      music: null,
      initial: false,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.lastQuestion = this.lastQuestion.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.answerSound = this.answerSound.bind(this);
    this.soundPlay = this.soundPlay.bind(this);
    this.setNewQuestions = this.setNewQuestions.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;

    this.fetchQuestions(token);
  }

  componentDidUpdate(prevState) {
    const { timer, questions, initial } = this.state;
    if (prevState.questions !== questions && initial === false) {
      console.log(questions, 'Alef');
      if (questions.length > 0) {
        this.setNewQuestions(shuffledAnswers(questions));
      }
    }
    if (timer >= 0) {
      this.setCountdown();
    }
  }

  setNewQuestions(newQuestions) {
    this.setState({
      questions: newQuestions,
      isPlaying: true,
      initial: true,
    });
  }

  setCountdown() {
    const { timer, isTiming } = this.state;
    if (timer > 0 && isTiming) {
      this.countdown(timer);
    }
  }

  answerSound(target) {
    if (target.classList.contains('correct_answer')) {
      this.setState({
        music: 'correct',
      });
    } else if (target.classList.contains('wrong_answer')) {
      this.setState({
        music: 'wrong',
      });
    }
  }

  updateScore({ target }) {
    const { submitAnswer } = this.props;
    const { timer, isPlaying } = this.state;
    const roundPoints = calculateScore(timer, target.id);
    if (!(target.classList.contains('correct_answer')
    || target.classList.contains('wrong_answer'))) {
      this.applyBorders();
    }
    if (target.classList.contains('correct_answer') && isPlaying) {
      submitAnswer(roundPoints);
      const localState = JSON.parse(localStorage.getItem('state'));
      localState.player.score += roundPoints;
      localState.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(localState));
    }
    this.answerSound(target);
    this.setState({
      isPlaying: false,
      isTiming: false,
    });
  }

  countdown(timer) {
    const oneSecond = 1000;
    setTimeout(() => this.setState(() => ({
      timer: timer - 1,
    })), oneSecond);
  }

  async fetchQuestions(token) {
    const questionsResponse = await ((await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json());
    this.setState({
      questions: questionsResponse.results,
    });
  }

  soundPlay() {
    const { music } = this.state;
    if (music === 'correct') {
      return CorrectSound;
    } if (music === 'wrong') {
      return WrongSound;
    }
    return null;
  }

  applyBorders() {
    const correctButton = document.querySelector('.correct');
    const wrongButton = document.querySelectorAll('.wrong');
    correctButton.className = 'correct_answer';
    wrongButton.forEach((button) => {
      button.className = 'wrong_answer';
      return null;
    });
    this.setState({
      answered: true,
    });
  }

  nextQuestion() {
    this.setState((state) => ({
      timer: 30,
      quest: state.quest + 1,
      answered: false,
      isPlaying: true,
      isTiming: true,
      music: null,
    }));
  }

  lastQuestion() {
    const { history, name, score, imgGravatar } = this.props;
    const personRank = { name, score, picture: imgGravatar };
    const rank = JSON.parse(localStorage.getItem('ranking'));
    rank.push(personRank);
    localStorage.setItem('ranking', JSON.stringify(rank));
    history.push('/feedback');
  }

  renderNextButton() {
    const number = 4;
    const { quest } = this.state;
    return quest === number ? (
      <Button
        buttonFunction={ this.lastQuestion }
        dataTest="btn-next"
        buttonText="Próxima"
        className="next-button"
      />
    )
      : (
        <Button
          buttonFunction={ this.nextQuestion }
          dataTest="btn-next"
          buttonText="Próxima"
          className="next-button"
        />
      );
  }

  renderGame() {
    const {
      questions,
      quest,
      isEnable,
      timer,
      answered,
      initial,
    } = this.state;
    return (
      <div>
        <audio src={ this.soundPlay() } autoPlay>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <div className={ styles.gameHeader }>
          <PlayerHeader />
        </div>
        <div className={ styles.gameSection }>
          {initial ? <Question
            questions={ questions }
            quest={ quest }
            isEnable={ isEnable }
            timer={ timer }
            buttonFunction={ this.updateScore }
          /> : <p> Loaging... </p>}
          { answered || timer === 0 ? this.renderNextButton() : null }
        </div>
      </div>
    );
  }

  render() {
    return (
      <main className={ styles.mainGame }>
        {this.renderGame()}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
  name: state.player.name,
  score: state.player.score,
  imgGravatar: state.player.img,
}
);

const mapDispatchToProps = (dispatch) => ({
  submitAnswer: (playerScore) => dispatch(submitAnswerAction(playerScore)),
});

TriviaGame.propTypes = {
  token: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  imgGravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
