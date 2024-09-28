import requests
import re
from typing import List
from textblob import TextBlob


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
    # for job in job_suggestions:
    #     try:
    #         query = f"{job} in New-York,USA"
    #         search_results = call_job_search_api(query)
    #         job_opportunities.append({
    #             "job_title": job,
    #             "search_results": search_results
    #         })
    #     except Exception as e:
    #         print(f"Error retrieving job opportunities for {job}: {e}")

    # Return the job opportunities
    return job_opportunities

def call_youtube_api(query: str) -> list:
   url = "https://youtube-v31.p.rapidapi.com/search"
   headers = {
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
        "x-rapidapi-key": "e76eef3aa7msh8f954766c77e6e0p15c728jsn199ab7529201"
    }
   params = {
        "relatedToVideoId": query,
        "part": "id,snippet",
        "type": "video",
        "maxResults": 10
    }
   response = requests.get(url, headers=headers, params=params)

   if response.status_code == 200:
        data = response.json()
        videos = []
        for item in data.get("items", []):
            video_info = {
                "videoId": item["id"].get("videoId"),
                "title": item["snippet"].get("title"),
                "channelTitle": item["snippet"].get("channelTitle"),
                "publishedAt": item["snippet"].get("publishedAt")
            }
            videos.append(video_info)
        return videos
   else: # error handling
        print(f"Error: {response.status_code}")
        return []


# hard code for now!
def recommend_youtube_videos(resume_text: str) -> List[str]:
    # Recommend YouTube videos based on job opportunities
    query_to_invoke = ""
    return ["https://www.youtube.com/watch?v=abcd1234, https://www.youtube.com/watch?v=efgh5678"]


def get_verbs(resume_text: str) -> List[str]:
    blob = TextBlob(resume_text)
    # Extract verbs based on part-of-speech tagging
    verbs = [word for word, pos in blob.tags if pos.startswith('VB')]
    return verbs


# function to get verbs
def get_numbers(resume_text: str) -> List[str]:
    return re.findall(r'\d+', resume_text)