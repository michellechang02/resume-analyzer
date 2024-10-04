import axios from 'axios';
import { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import ResumeUpload from './components/ResumeUpload';
import data from './data.json'


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
  numbers_query: string[];
  verbs_query: string[];
  youtube_query: string[];
  resume_strength: string;
  job_opportunities: JobOpportunity[];
  recommended_youtube_videos: string[];
}

export default function App() {

  const [resume, setResume] = useState<File | null>(null);
  const [response, setResponse] = useState<ResumeResponse | null>(data);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    } else {
      setResume(null); // Optionally handle cases where no file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload a resume file.");
      return;
    }
    setError('');
    setIsLoading(true);

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", resume);

    try {
      // Make API request
      const res = await axios.post("https://resumeanalyzer-backend.vercel.app/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
    } catch (error) {
      setError("Failed to upload resume. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <ChakraProvider>
      <ResumeUpload 
      handleSubmit={handleSubmit} 
      handleFileChange={handleFileChange}
      error={error}
      response={response}
      setSubmitted={setSubmitted}
      submitted={submitted}
      resume={resume}
      isLoading={isLoading}
      />
    </ChakraProvider>
  );
}
