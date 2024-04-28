from typing import Optional,Tuple

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select ,delete
from sqlalchemy.engine import Result

import api.schemas.favorite_video as favorite_video_schema
import api.schemas.video as video_schema
import api.models.models as favorite_video_model

async def favorite_video_list(
    db:AsyncSession
):
    result= await(
        db.execute(
            select(
                favorite_video_model.Video.id,
                favorite_video_model.Video.video_id,
                favorite_video_model.Video.title,
                favorite_video_model.Video.channel_title,
                favorite_video_model.Video.thumbnail_link,
                favorite_video_model.Favorite.created_at
            ).join(favorite_video_model.Favorite,favorite_video_model.Video.id==favorite_video_model.Favorite.video_id)
        )
    
    )
    
    return result.mappings().all()

async def get_favorite_video(
    db:AsyncSession, favorite_id:str
):
    result:Result= await(
        db.execute(
            select(
                favorite_video_model.Video
            ).join(
                favorite_video_model.Favorite,favorite_video_model.Video.id==favorite_video_model.Favorite.video_id
                ).where(
                    favorite_video_model.Favorite.id==favorite_id
                )
        )
    )
    favorite_video= result.scalars().first()
    return favorite_video if favorite_video is not None else None

async def create_favorite_video(
    db:AsyncSession, video_create:video_schema.VideoCreate
):
    video=favorite_video_model.Video(**video_create.dict())
    db.add(video)
    await db.flush()
    favorite=favorite_video_model.Favorite(video_id=video.id)
    db.add(favorite)
    await db.commit()
    await db.refresh(video)
    await db.refresh(favorite)
    
async def delete_favorite_video(
    db:AsyncSession, video_id:str,favorite_id:str
):
    await db.execute(delete(favorite_video_model.Favorite).where(favorite_video_model.Favorite.id==favorite_id))
    await db.execute(delete(favorite_video_model.Video).where(favorite_video_model.Video.id==video_id))
    await db.commit()