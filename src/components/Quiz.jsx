import { useState, useContext, useEffect } from 'react';
import { QuizContext } from '../Helpers/Context';
import { Questions } from '../Helpers/Questions';

export default function Quiz() {
  const { score, setScore, setGameState } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() =>{
    let timer;
    if(errorMessage){
      timer = setTimeout(() =>{
        setErrorMessage('');
      }, 2000);
    }
    return () => clearTimeout(timer);
  },[errorMessage]);

  const handleOptionClick = (option) => {
    setOptionChosen(option);
    setErrorMessage('');
  };

  const nextQuestion = () => {
    if (optionChosen === '') {
      setErrorMessage('At least try, you cannot skip!');
    } else {
      if (Questions[currentQuestion].answer === optionChosen) {
        setScore(score + 1);
      }
      setCurrentQuestion(currentQuestion + 1);
      setOptionChosen('');
      setErrorMessage('');
    }
  };

  const finishQuiz = () => {
    if (optionChosen === '') {
      setErrorMessage('At least try, you cannot skip!');
    } else {
      if (Questions[currentQuestion].answer === optionChosen) {
        setScore(score + 1);
      }
      setGameState('endScreen');
    }
  };

  return (
    <div className="Quiz">
      <h1>{Questions[currentQuestion].prompt}</h1>
      <div className="options">
        <button onClick={() => handleOptionClick('A')}>{Questions[currentQuestion].optionA}</button>
        <button onClick={() => handleOptionClick('B')}>{Questions[currentQuestion].optionB}</button>
        <button onClick={() => handleOptionClick('C')}>{Questions[currentQuestion].optionC}</button>
        <button onClick={() => handleOptionClick('D')}>{Questions[currentQuestion].optionD}</button>
      </div>

      {errorMessage && <p className='error-message-info'>{errorMessage}</p>}

      {currentQuestion === Questions.length - 1 ? (
        <button onClick={finishQuiz}>Finish Quiz</button>
      ) : (
        <button onClick={nextQuestion}>Next Question</button>
      )}
    </div>
  );
}
