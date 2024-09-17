import React from 'react';

interface SearchResult {
    employer_name: string;
    location: string;
    url: string;
}

interface JobOpportunity {
    job_title: string;
    search_results: SearchResult[];
}

interface ResumeResponse {
    resume_text: string;
    resume_strength: string;
    job_opportunities: JobOpportunity[];
    recommended_youtube_videos: string[];
}

interface SubmittedAnalysisProps {
    response: ResumeResponse | null;
}

const SubmittedAnalysis: React.FC<SubmittedAnalysisProps> = ({ response }) => {
    if (!response) {
        return null;
    }

    return (
        <div className="w-full max-w-md">
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold">Resume Text</h2>
                <p className="mt-2 text-gray-700"><strong>Resume Text:</strong> {response.resume_text}</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
                <h2 className="text-xl font-semibold">Resume Strength</h2>
                <p className="mt-2 text-gray-700"><strong>Strength:</strong> {response.resume_strength}</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
                <h2 className="text-xl font-semibold mb-4">Job Opportunities</h2>
                {response.job_opportunities && response.job_opportunities.length > 0 ? (
                    <ul className="list-disc list-inside mt-2">
                        {response.job_opportunities.map((job, index) => (
                            <li key={index} className="mt-2">
                                <p className="text-gray-900 font-semibold">{job.job_title}</p>
                                {job.search_results && job.search_results.length > 0 ? (
                                    <ul className="ml-4 list-disc list-inside">
                                        {job.search_results.map((result, idx) => (
                                            <li key={idx} className="text-gray-600">
                                                <p className="text-gray-800">Company: {result.employer_name || "Unknown"}</p>
                                                <p className="text-gray-600">Location: {result.location || "Location not available"}</p>
                                                <a
                                                    href={result.url}
                                                    className="text-blue-500 hover:underline"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Job Posting
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No results found for this job.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No job opportunities available at the moment.</p>
                )}

                <h3 className="mt-4 text-gray-700"><strong>YouTube Recommendations:</strong></h3>
                <p className="mt-2 text-gray-700">{response.recommended_youtube_videos.join(", ")}</p>
            </div>

        </div>
    );
};

export default SubmittedAnalysis;
