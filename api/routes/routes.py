import PyPDF2
import io
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
import logging
import os

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


from routes.api import analyze_resume_strength, suggest_job_opportunities, recommend_youtube_videos, get_verbs, get_numbers


uri = os.getenv("MONGODB_URL")

async def root():
    return "Hello, World!"

async def upload_resume(file: UploadFile = File(...)):
          # Log the file reception
    logging.info(f"Received file: {file.filename}")
    
    if file.filename == "":
        return JSONResponse({"error": "No file uploaded"}, status_code=400)

    # Read the file into memory
    file_content = await file.read()

    # Open the PDF from the in-memory file content
    try:
        # Initialize PyPDF2 PdfReader
        file_stream = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(file_stream)
        resume_text = ""

        # Iterate through all pages and extract text, making all lowercase
        for _, page in enumerate(pdf_reader.pages):
        # Extract text and convert to lowercase, then replace newline characters
            resume_text += page.extract_text().lower().replace('\n', ' ')

        # Process the resume content
        resume_strength = analyze_resume_strength(resume_text)
        job_opportunities = suggest_job_opportunities(resume_text)
        youtube_videos = recommend_youtube_videos(resume_text)
        numbers_query = get_numbers(resume_text)
        verbs_query = get_verbs(resume_text)
      

        return {
            "resume_text": resume_text,
            "numbers_query": numbers_query,
            "verbs_query": verbs_query,
            "resume_strength": resume_strength,
            "job_opportunities": job_opportunities,
            "recommended_youtube_videos": youtube_videos
        }

    except Exception as e:
        logging.error(f"Error reading PDF file: {str(e)}")
        return JSONResponse({"error": "Invalid PDF file", "detail": str(e)}, status_code=400)


# post data.json to mongodb cluster
async def post_data():
    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)


# connect to mongo db database, trying to get similar resume
async def get_similar_resume():
    pass
