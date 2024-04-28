import uuid

from typing import Optional,Tuple
from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy import select
from sqlalchemy.engine import Result

import api.schemas.favorite as favorite_schema
import api.models.models as favorite_model

async def get_favorite_list(
    db:AsyncSession
)->list[favorite_schema.Favorite]:
    result:Result=await(
        db.execute(
            select(favorite_model.Favorite)
        )
    )
    return result.all()

async def get_favorite(
    db:AsyncSession, favorite_id:int
)->favorite_schema.Favorite:
    result:Result=await db.execute(select(favorite_model.Favorite).filter(favorite_model.Favorite.id==favorite_id))
    video: Optional[Tuple[favorite_model.Favorite]]= result.first()
    return video[0] if video is not None else None

async def create_favorite(
    db:AsyncSession, favorite_create:favorite_schema.FavoriteCreate
)->favorite_model.Favorite:
    favorite=favorite_model.Favorite(**favorite_create.dict())
    db.add(favorite)
    await db.commit()
    await db.refresh(favorite)
    return favorite

async def delete_favorite(
    db:AsyncSession,original:favorite_model.Favorite
)->None:
    await db.delete(original)
    await db.commit()