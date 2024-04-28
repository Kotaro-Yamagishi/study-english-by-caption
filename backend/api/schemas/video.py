from typing import Optional

from pydantic import BaseModel, Field

# common part
class VideoBase(BaseModel):
    video_id:str
    title: str
    channel_title:str
    thumbnail_link:str
    
# for request
class VideoCreate(VideoBase):
    pass

# for response against request
class VideoCreateResponse(VideoCreate):
    id: int
    
    class Config:
        orm_mode = True

# for model
class Video(VideoBase):
    id: int