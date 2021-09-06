import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitAnswer as submitAnswerAction } from '../redux/actions';
import Header from '../components/Header';
import '../App.css';
// import Question from '../components/Question';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      isEnable: false,
      timer: 30,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    this.fetchQuestions(token);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer >= 0) {
      this.setCountdown();
    }
  }

  setCountdown() {
    const { timer } = this.state;
    if (timer > 0) {
      this.countdown(timer);
    }
  }

  getDifficulty(difficulty) {
    switch (difficulty) {
    case 'easy':
      return EASY;
    case 'medium':
      return MEDIUM;
    case 'hard':
      return HARD;
    default:
      return 0;
    }
  }

  updateScore({ target }) {
    const { submitAnswer } = this.props;
    const { timer } = this.state;
    const roundPoints = this.calculateScore(timer, target.id);
    this.applyBorders();
    if (target.classList.contains('correct_answer')) {
      submitAnswer(roundPoints);
      const localState = JSON.parse(localStorage.getItem('state'));
      localState.player.score += roundPoints;
      localStorage.setItem('state', JSON.stringify(localState));
    }
  }

  calculateScore(timer, difficulty) {
    const initial = 10;
    const difficultyLevel = this.getDifficulty(difficulty);
    return initial + (timer * difficultyLevel);
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

  applyBorders() {
    const rightButton = document.querySelector('.correct');
    const wrongButton = document.querySelectorAll('.wrong');
    rightButton.className = 'correct_answer';
    wrongButton.forEach((button) => {
      button.className = 'wrong_answer';
      return null;
    });
  }

  render() {
    const { questions, isEnable, timer } = this.state;
    return (
      <main>
        <div>
          <Header />
        </div>
        {questions.map((question, index) => (
          index === 0
            ? (
              <div key={ index }>
                <p>
                  OLHA A HORA:
                  { timer }
                </p>
                <p data-testid="question-category">{question.category}</p>
                <p>{ `Dificuldade: ${question.difficulty}` }</p>
                <p data-testid="question-text">{question.question}</p>
                <button
                  id={ question.difficulty }
                  onClick={ this.updateScore }
                  className="correct"
                  type="button"
                  data-testid="correct-answer"
                  disabled={ timer === 0 ? true : isEnable }
                >
                  { question.correct_answer }
                </button>
                {question.incorrect_answers
                  .map((wrong, index2) => (
                    <button
                      onClick={ this.updateScore }
                      className="wrong"
                      data-testid={ `wrong-answer-${index2}` }
                      type="button"
                      key={ index2 }
                      disabled={ timer === 0 ? true : isEnable }
                    >
                      { wrong }
                    </button>))}
              </div>) : null
        ))}
      </main>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  token: game.token,
}
);

const mapDispatchToProps = (dispatch) => ({
  submitAnswer: (playerScore) => dispatch(submitAnswerAction(playerScore)),
});

TriviaGame.propTypes = {
  token: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
