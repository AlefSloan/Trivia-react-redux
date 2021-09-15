import md5 from 'crypto-js/md5';

const URL = 'https://www.gravatar.com/avatar/';
const Two = 2;
const Four = 4;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

export async function getGravatarImgApi(email) {
  const convertedEmail = md5(email).toString();
  const endpoint = `${URL}${convertedEmail}`;
  const data = await fetch(endpoint);
  return data;
}

function numberArrShuffled(array) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const index2 = Math.floor(Math.random() * (index + 1));
    const temp = array[index];
    array[index] = array[index2];
    array[index2] = temp;
  }
  return array;
}

function numberArr(number) {
  const max = number;
  const arr = [];
  for (let index = 0; index < max; index += 1) {
    arr.push(index);
  }
  return numberArrShuffled(arr);
}

function shuffle(array, index) {
  const shuffleArr = [];
  console.log(array, index, 'OLHE AQUI ALEF - ANTES');
  index.forEach((indexToPush) => shuffleArr.push(array[indexToPush]));
  console.log(array, index, 'OLHE AQUI ALEF - DEPOIS');
  return shuffleArr;
}

export function shuffledAnswers(questions) {
  console.log('inicio');
  const answersMap = questions.map((answer) => [{
    correct: { value: answer.correct_answer,
      id: 'correct_answer' },
    incorrect: answer.incorrect_answers.map((answerIncorrect, index) => (
      { value: answerIncorrect,
        id: `wrong-answer-${index}` }
    )),
  }]);
  console.log(numberArr(2), 'answersMap');
  const answersConcat = answersMap.map((answer) => [
    answer[0].correct, ...answer[0].incorrect,
  ]);
  console.log(answersConcat, 'answersConcat');
  const shuffledArr = answersConcat.map((answer) => {
    let answers1;
    if (answer.length === Two) {
      answers1 = shuffle(answer, numberArr(2));
    } if (answer.length === Four) {
      answers1 = shuffle(answer, numberArr(Four));
    }
    return answers1;
  });
  console.log(shuffledArr, 'shuffledArr');
  const shuffledObject = questions.map((question, index) => {
    const Object = {
      category: question.category,
      type: question.category,
      difficulty: question.difficulty,
      question: question.question,
      answers: shuffledArr[index],
    }; return Object;
  });
  console.log(shuffledObject);
  return shuffledObject;
}

function getDifficulty(difficulty) {
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

export function calculateScore(timer, difficulty) {
  const initial = 10;
  const difficultyLevel = getDifficulty(difficulty);
  return initial + (timer * difficultyLevel);
}
