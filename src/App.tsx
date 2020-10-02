import React, { useEffect, useState } from "react";
import "./App.css";
import { getQuiz } from "./services/quiz_servics";
import { questionType } from "./Types/quiz_Types";
import QuestionCard from "./Components/QuestionCard";

function App() {
  let [quiz, setquiz] = useState<questionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('BOOOOM!');
    }


  useEffect(() => {
    async function fetchDataNow() {
      const Questions: questionType[] = await getQuiz(5, "easy");
      setquiz(Questions);
    }
    fetchDataNow();
  }, []);


  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: questionType = quiz[currentStep];
    console.log("Correct Answer ::::" + currentQuestion.correct_answer +"User Seclection:::" + userAns);

    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (currentStep !== quiz.length - 1) setCurrentStep(++currentStep);
    else {
      setShowResult(true);
    }
  };
  
  if (!quiz.length) return <h3>Loading...</h3>;


  


  if(showResult){
    return (
    <div className="question-container result-container">
      <h2>Result</h2>
      <p className="result-text">
        You final score is 
    <b> {score} </b> out of <b>{quiz.length} Result {seconds}</b>
      </p>
    </div>)
  }

  return (
    <div className="App">
    <h1>Quiz App</h1>

      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callBack={handleSubmit}
      />
    </div>
  );
}

export default App;
