import { useState} from 'react';
import { Field } from '../components/Field';
import { Foreplay } from '../businessLogic/Foreplay';
import { Idata, initialdata } from '../businessLogic/InitialData';
import { Loader } from '../components/loader/Loader';

export const Form = () => {
  const [data, setData] = useState<Idata[]>(initialdata);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverResponse, setServerResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (hasSubmitted) {
      setError("You've already submitted this form");
      return;
    }

    setIsLoading(true);
    setError(null);
    setServerResponse("");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const response = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const jsonResponse = await response.json();
      
      if (jsonResponse.ok == true) {
        setServerResponse(jsonResponse.message);
        // Mark as submitted in state and localStorage
        setHasSubmitted(true);
      } else {
        throw new Error('Invalid server response format');
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

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold">RpM Team Application</h2>
      <Foreplay/>

      <div className="flex flex-col justify-center p-8 gap-4 border rounded-2xl m-4 shadow-2xl">
        {data.map((field, index) => (
          <Field
            key={index}
            question={field.question}
            answer={field.answer}
            index={index}
            setData={setData}
            description={field.description}
          />
        ))}
        <button
          className={`bg-amber-600 border rounded-2xl flex justify-center items-center p-6 hover:bg-amber-100 transition-colors ${
            isLoading || hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit}
          disabled={isLoading || hasSubmitted}
        >
          {/* {isLoading ? 'loading...' : hasSubmitted ? 'Submitted ✓' : 'Submit'} */}
          {isLoading ? <Loader text='Loading...'/> : hasSubmitted ? 'Submitted ✓' : 'Submit' }
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

      </div>
    </div>
  );
};