from typing import List,Optional,Tuple

from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy import select
from sqlalchemy.engine import Result

import api.models.models as vocabulary_model
import api.schemas.vocabulary as vocabulary_schema

async def get_vocabulary_lists(
    db:AsyncSession
):
    result:Result= await(
        db.execute(
            select(
                vocabulary_model.Vocabulary.id,
                vocabulary_model.Vocabulary.word
            )
        )
    )

    return result.mappings().all()

async def get_vocabulary(
    db:AsyncSession,vocabulary_id:int
):
    # v_result:Result=await db.execute(select(vocabulary_model.Vocabulary).filter(vocabulary_model.Vocabulary.id==vocabulary_id))
    m_result:Result=await db.execute(
        select(
            vocabulary_model.Vocabulary
            ).filter(
                vocabulary_model.Vocabulary.id==vocabulary_id
                ))
    return m_result.scalars().first()
    

async def create_vocabulary(
    db:AsyncSession, vocabulary_create: vocabulary_schema.VocabularyCreate
)->vocabulary_model.Vocabulary:
    vocabulary=vocabulary_model.Vocabulary(**vocabulary_create.dict())
    db.add(vocabulary)
    await db.commit()
    await db.refresh(vocabulary)
    return vocabulary
    
async def update_vocabulary(
    db: AsyncSession, vocabulary_create:vocabulary_schema.VocabularyCreate,original: vocabulary_model.Vocabulary
)-> vocabulary_model.Vocabulary:
    original.name=vocabulary_create.name
    original.caption=vocabulary_create.caption
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original

async def delete_vocabulary(
    db: AsyncSession, original: vocabulary_model.Vocabulary
)->None:
    await db.delete(original)
    await db.commit()