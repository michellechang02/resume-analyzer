import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import root, upload_resume

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://resumeanalyzer-frontend.vercel.app", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# All routes 
app.get("/")(root)
app.post("/upload-resume/")(upload_resume)

# if __name__ == '__main__':
#     uvicorn.run(app)
