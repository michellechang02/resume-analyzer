"use client";

import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useState } from 'react';

export default function Home() {

  const [resume, setResume] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<String>('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload a resume file.");
      return;
    }
    setError('');

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", resume);

    try {
      // Make API request
      const res = await axios.post("/api/upload-resume", formData, {
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
