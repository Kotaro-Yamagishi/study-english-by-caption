import api.cruds.favorite as favorite_crud
import api.schemas.favorite as favorite_schema
import api.services.favorite_video as favorite_video_service
import api.schemas.video as video_schema

from fastapi import APIRouter,Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import get_db

router=APIRouter()

@router.get("/favorites")
async def get_favorite_video_list(db:AsyncSession=Depends(get_db)):
    return await favorite_video_service.get_favorite_video_list(db)

@router.post("/favorites", status_code=201)
async def insert_favorite(video_body:video_schema.VideoCreate,db:AsyncSession=Depends(get_db)):
    return await favorite_video_service.create_favorite_video(video_body,db)

@router.delete("/favorites/{favorite_id}",status_code=204)
async def delete_favorite(
    favorite_id:int,db:AsyncSession=Depends(get_db)
):
    return await favorite_video_service.delete_favorite_video(favorite_id,db)