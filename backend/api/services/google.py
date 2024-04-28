from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import JSONFormatter
import api.schemas.caption as caption_schema
import api.schemas.video as video_schema
import json
import os
from dotenv import load_dotenv
from apiclient.discovery import build

load_dotenv()

api_service_name = "youtube"
api_version = "v3"
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
    
youtube = build(api_service_name, api_version, developerKey=YOUTUBE_API_KEY)

def get_caption(video_id):
    transcript=YouTubeTranscriptApi.get_transcript(video_id)
    formatter = JSONFormatter()
    r = formatter.format_transcript(transcript)
    list_c=json.loads(r)
    captions:list[caption_schema.Caption]=[]
    for c in list_c:
        caption=caption_schema.Caption(
            c.get("text"),
            c.get("start")
        )
        captions.append(caption)
    return captions

def get_video_information(video_id):
    request = youtube.videos().list(
        part="snippet,statistics",
        id=video_id,
        fields="items(id,snippet(title,description,channelTitle,thumbnails(default(url))))"
    )
    
    response = request.execute()
    video_snippet = response["items"][0]
    video=video_schema.VideoBase(
        video_id=video_snippet["id"],
        title=video_snippet["snippet"]["title"],
        description=video_snippet["snippet"]["description"],
        channel_title=video_snippet["snippet"]["channelTitle"],
        thumbnail_link=video_snippet["snippet"]["thumbnails"]["default"]["url"]
    )
    return video
    