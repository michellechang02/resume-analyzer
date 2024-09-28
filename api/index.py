import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import root, upload_resume, post_data
from dotenv import load_dotenv


load_dotenv()
app = FastAPI()


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://resumeanalyzer-frontend.vercel.app", "http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# All routes 
app.get("/")(root)
app.post("/upload-resume/")(upload_resume)
app.post("/post-data/")(post_data)

# if __name__ == '__main__':
#     uvicorn.run(app)
