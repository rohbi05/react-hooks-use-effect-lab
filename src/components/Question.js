import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=> {
    if(timeRemaining > 0){
      const timerId = setTimeout(()=>{
        setTimeRemaining((prevTime) => prevTime - 1);

      }, 1000);

      //cleaning the timer when time remaining hits 0
      return() => clearTimeout(timerId);
    } else{
      //if time runs out , reset timer and trigger onAnswered callback with false
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
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