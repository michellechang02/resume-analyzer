import PyPDF2
import io
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import logging
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from helper import analyze_resume_strength, suggest_job_opportunities, recommend_youtube_videos

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nextjs-fastapi-starter-gamma-sand.vercel.app", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return "Hello, World!"

@app.post("/upload-resume/")
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
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            resume_text += page.extract_text().lower()

        # Process the resume content
        resume_strength = analyze_resume_strength(resume_text)
        job_opportunities = suggest_job_opportunities(resume_text)
        youtube_videos = recommend_youtube_videos(resume_text)
    
        return {
            "resume_text": resume_text,
            "resume_strength": resume_strength,
            "job_opportunities": job_opportunities,
            "recommended_youtube_videos": youtube_videos
        }

    except Exception as e:
        logging.error(f"Error reading PDF file: {str(e)}")
        return JSONResponse({"error": "Invalid PDF file"}, status_code=400)


# if __name__ == '__main__':
#     uvicorn.run(app)
