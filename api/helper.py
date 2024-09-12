import requests
from typing import List

# Placeholder function to analyze resume strength
def analyze_resume_strength(resume_text: str) -> str:
    # Extract relevant sections from the resume text
    if "Software Engineering Intern" in resume_text and "Microsoft" in resume_text:
        experience = "Strong experience in top-tier companies like Microsoft and Qualcomm."
    else:
        experience = "Experience in reputable companies."

    if "University of Pennsylvania" in resume_text and "Computer Science" in resume_text:
        education = "Solid educational background from a prestigious institution."
    else:
        education = "Good educational background."

    if "Python" in resume_text and "React" in resume_text and "DevOps/MLOps" in resume_text:
        skills = "Excellent technical skills, including programming and DevOps/MLOps expertise."
    else:
        skills = "Relevant technical skills."

    # Combine all the insights to generate an analysis
    analysis = f"{education} {experience} {skills}"

    return analysis

def call_job_search_api(query: str) -> List[dict]:
    url = f"https://jsearch.p.rapidapi.com/search?query={query}&page=1&num_pages=1&date_posted=all"
    
    headers = {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": "e76eef3aa7msh8f954766c77e6e0p15c728jsn199ab7529201"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json().get("data", [])
    else:
        raise Exception(f"Failed to retrieve data: {response.status_code}, {response.text}")

def suggest_job_opportunities(resume_text: str) -> List[str]:
    job_suggestions = []

    # Suggest jobs based on resume_text
    if "software" in resume_text.lower():
        job_suggestions.append("Software Engineer")
    if "backend" in resume_text.lower():
        job_suggestions.append("Backend Developer")
    if "full stack" in resume_text.lower() or "frontend" in resume_text.lower():
        job_suggestions.append("Full Stack Developer")
    if "node.js" in resume_text.lower():
        job_suggestions.append("Node.js Developer")

    # Call API for each suggested job
    job_opportunities = []
    for job in job_suggestions:
        try:
            query = f"{job} in New-York,USA"
            search_results = call_job_search_api(query)
            job_opportunities.append({
                "job_title": job,
                "search_results": search_results
            })
        except Exception as e:
            print(f"Error retrieving job opportunities for {job}: {e}")

    # Return the job opportunities
    return job_opportunities

# Placeholder function to recommend YouTube videos
def recommend_youtube_videos(resume_text: str) -> List[str]:
    # Recommend YouTube videos based on job opportunities
    return [
        "https://www.youtube.com/watch?v=abc123 - How to Become a Software Engineer",
        "https://www.youtube.com/watch?v=def456 - Full Stack Developer Roadmap",
    ]