import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // If the timer reaches 1 second, call onAnswered with false
          onAnswered(false);
          return 10; // Reset the timer to 10 seconds
        } else {
          return prevTime - 1; // Decrement the time remaining
        }
      });
    }, 1000);
  
    return () => {
      clearTimeout(timer); // Cleanup the timer
    };
  }, [timeRemaining, onAnswered]);
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    setQuestionAnswered(true);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
