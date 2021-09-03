import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import Question from '../components/Question';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    this.fetchQuestions(token);
  }

  async fetchQuestions(token) {
    const questionsResponse = await ((await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json());
    this.setState({
      questions: questionsResponse.results,
    });
  }

  render() {
    const { questions } = this.state;
    return (
      <main>
        <div>
          <Header />
        </div>
        {questions.map((question, index) => (
          index === 0
            ? (
              <div key={ index }>
                <p data-testid="question-category">{question.category}</p>
                <p data-testid="question-text">{question.question}</p>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  { question.correct_answer }
                </button>
                {question.incorrect_answers
                  .map((wrong, index2) => (
                    <button
                      data-testid={ `wrong-answer-${index2}` }
                      type="button"
                      key={ index2 }
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
