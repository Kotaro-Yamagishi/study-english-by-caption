from pydantic import BaseModel

import api.schemas.favorite as favorite_schema
import api.schemas.video as video_schema

class FavoriteVideoCreate(BaseModel):
    favorite_create:favorite_schema.FavoriteCreate
    video_create:video_schema.VideoCreate
    
    class Config:
        orm_mode = True

class FavoriteVideoCreateResponse(BaseModel):
    favorite_create_response:favorite_schema.FavoriteCreateResponse
    video_create_response:video_schema.VideoCreateResponse
    
    class Config:
        orm_mode = True

class FavoriteVideo(BaseModel):
    favorite:favorite_schema.Favorite
    video:video_schema.Video
    
    class Config:
        orm_mode = True