import api.cruds.favorite_video as favorite_video_crud
import api.schemas.video as video_schema
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException

from api.db import get_db

async def get_favorite_video_list(db:AsyncSession=Depends(get_db)):
    return await favorite_video_crud.favorite_video_list(db)

async def create_favorite_video(video_body:video_schema.VideoCreate,db:AsyncSession=Depends(get_db)):
    return await favorite_video_crud.create_favorite_video(db,video_body)

async def delete_favorite_video(favorite_id:str,db:AsyncSession=Depends(get_db)):
    favorite_video = await favorite_video_crud.get_favorite_video(db,favorite_id)
    if favorite_video is None:
        return HTTPException(status_code=404,detail="favorite not found")
    await favorite_video_crud.delete_favorite_video(db,favorite_video.id,favorite_id)