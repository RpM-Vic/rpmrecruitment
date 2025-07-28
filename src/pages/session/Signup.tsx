import { useState, useRef } from "react";
import { Loader } from "../../components/loader/Loader";

type ApiResponse = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

interface IErrors{
  email?: string; 
  password?: string
  password2?:string
}

export const Signup = () => {
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisible2, setIsVisible2] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrors>({});
  const formRef = useRef<HTMLDivElement>(null);

  const handelVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const validateForm = (): boolean => {
    const newErrors: {email?: string; password?: string, password2?:string} = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password||!password2) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if(password!==password2){
      newErrors.password2 = "The passwords don't match"
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setMessage("");
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("Loading...");

    try {
      const url = '/api/login/signin';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data: ApiResponse = await response.json();
      
      if (data.ok) {
        window.location.href = '/user';
      } else {
        setMessage(data.message || "sign up failed");
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      let errorMessage = "The server is busy";
      
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else {
          errorMessage = error.message || "An unexpected error occurred";
        }
      }
      
      setMessage(errorMessage);
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div 
      ref={formRef}
      className="maindiv max-w-md mx-auto p-6 gap-4 text-white border-2 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold text-white mb-6">Sign up</h2>
      <div className="gap-5">
        <div className="mb-5">
          <label htmlFor="loginMail">Email</label>
          <input
            type="text"
            placeholder="example@mail.com"
            id="loginMail"
            value={email}
            className={`textField mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        {/* password 1 */}
        <div>
          <div className="gap-x-3 flex items-center justify-between">
            <label
              htmlFor="loginPassword"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <button
              type="button"
              className="border rounded-md px-2 hover:bg-gray-700"
              onClick={handelVisibility}
            >
              {isVisible ? 'hide' : 'show'}
            </button>
          </div>
          
          <input
            type={isVisible ? 'text' : 'password'}
            value={password}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="shhhhhh"
            id="loginPassword"
            className={`textField mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* password 2 */}
        <div>
          <div className="gap-x-3 flex items-center justify-between">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-white"
            >
              Confirm password
            </label>
            <button
              type="button"
              className="border rounded-md px-2 hover:bg-gray-700"
              onClick={()=>{setIsVisible2((prev)=>!prev)}}
            >
              {isVisible2 ? 'hide' : 'show'}
            </button>
          </div>
          
          <input
            type={isVisible2 ? 'text' : 'password'}
            value={password2}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="shhhhhh"
            id="password2"
            className={`textField mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password2 && (
            <p className="mt-1 text-sm text-red-500">{errors.password2}</p>
          )}
        </div>

      </div>

      <div>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isLoading || !email || !password}
          className="my-6 rounded-md px-4 py-2 bg-gray-700 text-white hover:bg-blue-600 disabled:bg-gray-400 transition-colors focus:ring-offset-2 disabled:opacity-50 w-full"
        >
          {isLoading ? <Loader text="Loading session..." /> : 'Sign up'}
        </button>
      </div>

      {message && (
        <p className={`mt-4 text-sm ${
          message.includes("failed") || message === "The server is busy" 
            ? "text-red-500" 
            : "text-blue-500"
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};
