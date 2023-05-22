import { useContext } from 'react';
import { QuizContext } from '../Helpers/Context';
import { Questions } from '../Helpers/Questions';
import '../App.css';

export default function EndScreen() {
  const { score, setScore, setGameState } = useContext(QuizContext);

  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  }

  const totalQuestions = Questions.length;
  const allAnswersCorrect = score === totalQuestions;
  const halfCorrect = score >= totalQuestions / 2;

  let message = "";
  if (allAnswersCorrect) {
    message = "Congratulations! You were able to guess all answers correctly.";
  } else if (halfCorrect) {
    message = "Well done! You scored at least half of the questions correctly.";
  } else {
    message = "Try again! Your score is too low.";
  }

  return (
    <div className='EndScreen'>
      <h1>Quiz Finished</h1>
      <h2>Your Score</h2>
      <h3>{score} / {totalQuestions}</h3>

      <p className='message-info'>{message}</p>

      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}
