from typing import List

from fastapi import APIRouter,Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.video as video_schema
import api.cruds.video as video_crud
from api.db import get_db

router=APIRouter()

@router.get("/videos",response_model=List[video_schema.Video] ,status_code=200)
async def list_videos(db:AsyncSession=Depends(get_db)):
    return await video_crud.get_video_lists(db)


@router.post("/videos",response_model=video_schema.VideoCreateResponse, status_code=201)
async def create_video(
    video_body: video_schema.VideoCreate, db:AsyncSession=Depends(get_db)
):
    return await video_crud.create_video(db,video_body)


@router.put("/videos/{video_id}",response_model=video_schema.VideoCreateResponse, status_code=202)
async def update_video(
    video_id:int,video_body:video_schema.VideoCreate,db:AsyncSession=Depends(get_db)
):
    video =await video_crud.get_video(db,video_id)
    if video is None:
        return HTTPException(status_code=404,detail="Video not found")
    return await video_crud.update_video(db,video_body,video)


@router.delete("/videos/{video_id}", status_code=204)
async def delete_video(
    video_id:int,db:AsyncSession=Depends(get_db)
):
    video =await video_crud.get_video(db,video_id)
    if video is None:
        return HTTPException(status_code=404,detail="Video not found")
    return await video_crud.delete_video(db,video)