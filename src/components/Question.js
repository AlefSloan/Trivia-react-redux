import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../css/TriviaGame.module.css';
import Button from './Button';

class Question extends Component {
  render() {
    const { questions, quest, isEnable, timer, buttonFunction } = this.props;

    return (
      <div>
        {questions.map((question, index) => (
          index === quest
            ? (
              <div className={ styles.questionBox } key={ index }>
                <div className={ styles.questionInfo }>
                  <p>
                    OLHA A HORA:
                    { timer }
                  </p>
                  <p data-testid="question-category">{question.category}</p>
                  <p>{ `Dificuldade: ${question.difficulty}` }</p>
                </div>
                <p data-testid="question-text">{question.question}</p>
                <Button
                  buttonId={ question.difficulty }
                  buttonFunction={ buttonFunction }
                  className="correct"
                  dataTest="correct-answer"
                  isDisabled={ timer === 0 ? true : isEnable }
                  buttonText={ question.correct_answer }
                />
                {question.incorrect_answers
                  .map((wrong, index2) => (
                    <Button
                      key={ index2 }
                      buttonFunction={ buttonFunction }
                      className="wrong"
                      dataTest={ `wrong-answer-${index2}` }
                      isDisabled={ timer === 0 ? true : isEnable }
                      buttonText={ wrong }
                    />
                  ))}
              </div>) : null
        ))}
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  quest: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  isEnable: PropTypes.bool.isRequired,
  buttonFunction: PropTypes.func.isRequired,
};

export default Question;
