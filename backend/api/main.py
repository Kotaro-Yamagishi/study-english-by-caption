import sys
from fastapi import FastAPI
from os import getenv
import googleapiclient.discovery
from fastapi.middleware.cors import CORSMiddleware

from api.routers import google
from api.routers import video
from api.routers import vocabulary
from api.routers import dictionary
from api.routers import favorite

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = getenv('DEVELOPER_KEY')

def get_authenticated_service():
    return googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=DEVELOPER_KEY)

app=FastAPI()
app.include_router(google.router)
app.include_router(video.router)
app.include_router(vocabulary.router)
app.include_router(dictionary.router)
app.include_router(favorite.router)

# アクセスを許可するオリジン（URLのようなもの）を設定
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # 認証情報のアクセスを許可(今回は必要ない)
    allow_credentials=True,
    # 全てのリクエストメソッドを許可(["GET", "POST"]など個別指定も可能)
    allow_methods=["*"],
    # アクセス可能なレスポンスヘッダーを設定（今回は必要ない）
    allow_headers=["*"],
)

