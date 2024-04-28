import api.cruds.favorite as favorite_crud
import api.schemas.favorite as favorite_schema
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException


from api.db import get_db

def get_favorite_list():
    return favorite_crud.get_favorite_list()

def create_favorite(favorite_body:favorite_schema.FavoriteCreate,db:AsyncSession=Depends(get_db)):
    favorite_crud.create_favorite(db,favorite_body)