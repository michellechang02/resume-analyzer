"use client";

import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useState } from 'react';

interface ResumeResponse {
  resume_text: string;
  resume_strength: string;
  job_opportunities: string[];
  recommended_youtube_videos: string[];
}

export default function Home() {

  const [resume, setResume] = useState<File | null>(null);
  const [response, setResponse] = useState<ResumeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);


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
    console.log("submitting time!");

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", resume);

    try {
      // Make API request
      const res = await axios.post("https://nextjs-fastapi-starter-bms1.vercel.app/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
    } catch (error) {
      setError("Failed to upload resume. Please try again.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Upload Resume</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Upload Resume
          </button>
        </form>

        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Resume Analysis</h2>
            <p className="mt-2 text-gray-700"><strong>Resume Text:</strong> {response.resume_text}</p>
            <p className="mt-2 text-gray-700"><strong>Strength:</strong> {response.resume_strength}</p>
            <p className="mt-2 text-gray-700"><strong>Job Opportunities:</strong> {response.job_opportunities.join(", ")}</p>
            <p className="mt-2 text-gray-700"><strong>YouTube Recommendations:</strong> {response.recommended_youtube_videos.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
