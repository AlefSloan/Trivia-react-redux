import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../App.css';
// import Question from '../components/Question';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      isEnable: false,
      timer: 30,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
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

  async fetchQuestions(token) {
    const questionsResponse = await ((await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json());
    this.setState({
      questions: questionsResponse.results,
    });
  }

  countdown(timer) {
    const oneSecond = 1000;
    setTimeout(() => this.setState(() => ({
      timer: timer - 1,
    })), oneSecond);
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
                <p data-testid="question-text">{question.question}</p>
                <button
                  onClick={ this.applyBorders }
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
                      onClick={ this.applyBorders }
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

TriviaGame.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(TriviaGame);
