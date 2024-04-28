from sqlalchemy import Column, Integer, String, ForeignKey ,DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from api.db import Base

# 将来的にはmodelクラスをmigration管理またはクラスをファイル単位で管理したい
# ただし、このファイルはおそらくマイグレーションしたいクラスを定義するためのクラスであるため、別ファイルに分けるという対処を取るよりかはmigration管理の方が良さそう

class Video(Base):
    __tablename__="videos"
    
    id=Column(Integer,primary_key=True)
    video_id=mapped_column(String(1024))
    title=mapped_column(String(1024))
    description=mapped_column(String(1024))
    channel_title=mapped_column(String(1024))
    thumbnail_link=mapped_column(String(1024))
    
class Vocabulary(Base):
    __tablename__="vocabularies"
    
    id:Mapped[int]= mapped_column(primary_key=True)
    word:Mapped[str]=mapped_column(String(1024))
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    # meanings: Mapped[list["Meaning"]]=relationship("Meaning",back_populates="vocabulary")
    # video_ids=relationship("VocabularyVideoXREF",back_populates="vocabulary")
    
    
    
class Favorite(Base):
    __tablename__="favorites"
    
    id=Column(Integer,primary_key=True)
    video_id=mapped_column(Integer,ForeignKey("videos.id"),nullable=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )