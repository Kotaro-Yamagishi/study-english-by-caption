from typing import List,Optional,Tuple

from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy import select
from sqlalchemy.engine import Result

import api.models.models as video_model
import api.schemas.video as video_schema

async def get_video_lists(
    db:AsyncSession
)->List[video_schema.Video]:
    result:Result= await(
        db.execute(
            select(
                video_model.Video.id,
                video_model.Video.video_id,
                video_model.Video.title,
                video_model.Video.description,
                video_model.Video.channel_title,
                video_model.Video.thumbnail_link,
            )
        )
    )
    return result.all()

async def get_video(
    db:AsyncSession,video_id:int
)->video_schema.Video:
    result:Result=await db.execute(select(video_model.Video).filter(video_model.Video.id==video_id))
    video: Optional[Tuple[video_model.Video]]= result.first()
    return video[0] if video is not None else None
    

async def create_video(
    db:AsyncSession, video_create: video_schema.VideoCreate
)->video_model.Video:
    video=video_model.Video(**video_create.dict())
    db.add(video)
    await db.commit()
    await db.refresh(video)
    return video

async def update_video(
    db: AsyncSession, video_create:video_schema.VideoCreate,original: video_model.Video
)-> video_model.Video:
    original.name=video_create.name
    original.caption=video_create.caption
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original

async def delete_video(
    db: AsyncSession, original: video_model.Video
)->None:
    await db.delete(original)
    await db.commit()