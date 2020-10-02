import React, { useState } from "react";
import { questionPropsType } from "./../Types/quiz_Types";

const QuestionCard: React.FC<questionPropsType> = ({question,options,callBack,}) => {
  let [SelectedAns, setSelectedAns] = useState("");

  const handleSelection = (ev: any) => {
    setSelectedAns(ev.target.value);
  };

  return (
    <div className="question-container">
      <div className="question">
          <h4>{question}</h4>
          
     </div>

      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callBack(e, SelectedAns)}
        className="question-form"
      >
        {options.map((opt: string, ind: number) => {
          return (
            <div key={ind}>
              <label className="radio">
                <input
                  type="radio"
                  name="opt"
                  value={opt}
                  required
                  checked={SelectedAns === opt}
                  onChange={handleSelection}
                />
                {opt}
              </label>
            </div>
          );
        })}
        <input type="submit" className="submit"/>
      </form>
    </div>
  );
};

export default QuestionCard;
