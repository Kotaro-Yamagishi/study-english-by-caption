from pydantic import BaseModel
from datetime import datetime

# common part
class FavoriteBase(BaseModel):
    video_id:int
    
# for request
class FavoriteCreate(FavoriteBase):
    pass

# for response against request
class FavoriteCreateResponse(FavoriteCreate):
    id: int
    
    class Config:
        orm_mode = True

# for model
class Favorite(FavoriteBase):
    id: int
    created_at: datetime
