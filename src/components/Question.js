import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../css/TriviaGame.module.css';
import Button from './Button';

class Question extends Component {
  render() {
    const { questions, quest, isEnable, timer, buttonFunction } = this.props;
    console.log(questions);
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
                {question.answers
                  .map((question2, index2) => (
                    <Button
                      key={ index2 }
                      buttonId={ question2.id === 'correct_answer'
                        ? question.difficulty : null }
                      buttonFunction={ buttonFunction }
                      className={
                        question2.id === 'correct_answer' ? 'correct' : 'wrong'
                      }
                      dataTest={ question2.id === 'correct_answer'
                        ? 'correct-answer' : 'wrong-answer' }
                      isDisabled={ timer === 0 ? true : isEnable }
                      buttonText={ question2.value }
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
