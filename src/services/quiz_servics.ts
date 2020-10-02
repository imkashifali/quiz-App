import { Quiz,questionType } from "./../Types/quiz_Types";

const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const getQuiz = async (totalQuestion: number, level: string): Promise<questionType[]> => {
  const response = await fetch(
    ` https://opentdb.com/api.php?amount=${totalQuestion}&difficulty=${level}&type=multiple`
  );
  let { results } = await response.json();

  const quiz: questionType[] = results.map((QuestionObj: Quiz, ind: number) => {
    return {
      question: QuestionObj.question,
      answer: QuestionObj.correct_answer,
      correct_answer:QuestionObj.correct_answer,
      option: shuffleArray( QuestionObj.incorrect_answers.concat(QuestionObj.correct_answer)),
    };
  });

  return quiz;
};
