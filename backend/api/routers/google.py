from fastapi import APIRouter
import os
from dotenv import load_dotenv
from apiclient.discovery import build
import api.services.google as google_service

router=APIRouter()
prefix_router = APIRouter(prefix="/google")

load_dotenv()

api_service_name = "youtube"
api_version = "v3"
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
    
youtube = build(api_service_name, api_version, developerKey=YOUTUBE_API_KEY)

@router.get("/channel", status_code=200)
async def get_channel_infomation(video_id):
    return google_service.get_video_information(video_id)

# api that i can download video
@router.get("/caption" ,status_code=200)
async def get_caption(video_id):
    return google_service.get_caption(video_id)
