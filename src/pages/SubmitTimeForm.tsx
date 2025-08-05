import { useState, useEffect } from "react";
import { Field } from "../components/Field";
import { Loader } from "../components/loader/Loader";


interface FormData {
  question: string;
  answer: string;
  description?: string;
}

export const SubmitTimeForm = () => {
  const [questions, setQuestions] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [serverResponse, setServerResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const importQuestions = async () => {
    setFetchLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const results = await fetch('/api/submittime', {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!results.ok) {
        throw new Error(`Server responded with ${results.status}`);
      }

      const data = await results.json();
      setQuestions(data.submitTimeQuestions || []);
    } catch (err) {
      clearTimeout(timeoutId);
      const errorMessage = err instanceof Error ? 
        (err.name === 'AbortError' ? 'Request timed out' : err.message) : 
        'Failed to load questions';
      setError(errorMessage);
      console.error('Fetch error:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (hasSubmitted) {
      setError("You've already submitted this form");
      return;
    }

    if (questions.some(q => !q.answer.trim())) {
      setError("Please answer all questions before submitting");
      return;
    }

    setIsLoading(true);
    setError(null);
    setServerResponse("");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const response = await fetch("/api/submittime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const jsonResponse = await response.json();
      
      if (jsonResponse.ok === true) {
        setServerResponse(jsonResponse.message || "Time submitted successfully!");
        setHasSubmitted(true);
      } else {
        throw new Error(jsonResponse.message || 'Invalid server response format');
      }
    } catch (e) {
      clearTimeout(timeoutId);
      const errorMessage = e instanceof Error ? 
        (e.name === 'AbortError' ? 'Request timed out' : e.message) : 
        'Unknown error occurred';
      setError(errorMessage);
      console.error('Submission error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    importQuestions();
  }, []);

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold">Submit Your Time</h2>

      <div className="flex flex-col justify-center p-8 gap-4 border rounded-2xl m-4 shadow-2xl">
        {fetchLoading ? (
          <Loader text="Loading questions, please be patient" />
        ) : error ? (
          <div className="text-red-600 p-2 rounded bg-red-50">
            Error: {error}
          </div>
        ) : questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          <>
            {questions.map((question, index) => (
              <Field
                key={index}
                question={question.question}
                answer={question.answer}
                index={index}
                setData={setQuestions}
                description={question.description}
              />
            ))}
            
            <button
              className={`bg-gray-500 text-white hover:text-black border rounded-2xl flex justify-center items-center p-6 hover:bg-gray-200 transition-colors ${
                isLoading || hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit}
              disabled={isLoading || hasSubmitted || fetchLoading}
            >
              {isLoading ? <Loader text='Submitting...'/> : hasSubmitted ? 'Submitted ✓' : 'Submit'}
            </button>
            
            {serverResponse && (
              <div className="text-green-600 p-2 rounded bg-green-50">
                {serverResponse}
              </div>
            )}
            
            {error && (
              <div className="text-red-600 p-2 rounded bg-red-50">
                Error: {error}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};