from typing import List

from fastapi import APIRouter,Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.vocabulary as vocabulary_schema
import api.cruds.vocabulary as vocabulary_crud
import api.services.vocabulary as vocabulary_service

from api.db import get_db

router=APIRouter()

@router.get("/vocabularies", status_code=200)
async def list_vocabularies(db:AsyncSession=Depends(get_db)):
    return await vocabulary_crud.get_vocabulary_lists(db)

@router.get("/vocabularies/{vocabulary_id}", status_code=200)
async def list_vocabularies(vocabulary_id:int,db:AsyncSession=Depends(get_db)):
    return await vocabulary_crud.get_vocabulary(db,vocabulary_id)

@router.post("/vocabularies", status_code=201)
async def create_vocabulary(
    vocabulary_body: vocabulary_schema.VocabularyCreate, db:AsyncSession=Depends(get_db)
):
    return await vocabulary_crud.create_vocabulary(db,vocabulary_body)

@router.delete("/vocabularies/{vocabulary_id}", status_code=204)
async def delete_vocabulary(
    vocabulary_id:int,db:AsyncSession=Depends(get_db)
):
    vocabulary =await vocabulary_crud.get_vocabulary(db,vocabulary_id)
    if vocabulary is None:
        return HTTPException(status_code=404,detail="vocabulary not found")
    print("aaa")
    return await vocabulary_crud.delete_vocabulary(db,vocabulary)