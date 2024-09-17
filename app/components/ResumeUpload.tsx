import React, { ChangeEvent, FormEvent, useEffect } from "react";
import SubmittedAnalysis from "./SubmittedAnalysis";

interface JobOpportunity {
    job_title: string;
    search_results: SearchResult[];
  }
  
  interface SearchResult {
    employer_name: string;
    location: string;
    url: string;
  }
  
  interface ResumeResponse {
    resume_text: string;
    resume_strength: string;
    job_opportunities: JobOpportunity[];
    recommended_youtube_videos: string[];
  }

interface ResumeUploadProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setSubmitted: (submitted: boolean) => void;
    error: string | null;
    response: ResumeResponse | null;
    submitted: boolean;
    resume: File | null;
  }


  

const ResumeUpload: React.FC<ResumeUploadProps> = ({
    handleSubmit,
    handleFileChange,
    setSubmitted,
    error,
    response,
    submitted,
    resume
  }) => {

    useEffect(() => {
      console.log(submitted);
    })


  return (


    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 space-y-6">
      
      {!submitted && (
    <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Upload Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 text-center bg-gray-100 hover:bg-gray-200 transition"
          >
            {resume ? resume.name : "Select a PDF File"}
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  )}

    {submitted && response && <div>
        <SubmittedAnalysis response={response}/>
        </div>
    }
    {submitted && response && 
    <div className="mt-4">
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => setSubmitted(false)}
        >
        Go Back
        </button>
    </div>}

    </div>
  );
};

export default ResumeUpload;
