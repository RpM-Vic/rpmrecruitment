import { useEffect, useState } from "react";
import { Loader } from "../components/loader/Loader";

interface ServerQuestion {
  question: string;
  answer: string;
  description?: string;
}

export const SubmitTimeForm = () => {
  const [questions, setQuestions] = useState<ServerQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const importQuestions = async () => {
    setIsLoading(true);
    setQuestions(null);

    try {
      const results = await fetch('/api/submittime', {
        method: 'GET'
      });
      const data = await results.json();
      setQuestions(data.submitTimeQuestions);
    } catch (err) {
      console.log('error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    importQuestions();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold">Submit your time</h2>
      <div>
        {isLoading ? (
          <Loader text="Loading questions, please be patient" />
        ) : questions ? (
          questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              <input type="text" />
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
};