from typing import List,Optional
from pydantic import BaseModel
from datetime import datetime

class Definition(BaseModel):
    definition:str
    example:Optional[str]
    
    class Config:
        from_attributes = True

# class Synonym(BaseModel):
#     synonym:str
    
#     class Config:
#         from_attributes = True
        
# class Antonym(BaseModel):
#     antonym:str
    
#     class Config:
#         from_attributes = True
    
class Meaning(BaseModel):
    part_of_speech:str
    definitions: list[Definition]   
    synonyms: list[str]
    antonyms:list[str]
    
    class Config:
        from_attributes = True

class VocabularyBase(BaseModel):
    word:str


class VocabularyCreate(VocabularyBase):
    pass
    # video_id:str

class VocabularyCreateResponse(VocabularyCreate):
    id: int
    
    class Config:
        from_attributes = True
        
class Vocabulary(VocabularyBase):
    id:int
    creaated_at: datetime
    
class Dictionary(VocabularyBase):
    meanings:list[Meaning]
    
    class Config:
        from_attributes = True