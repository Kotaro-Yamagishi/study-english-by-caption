## 事前準備
### for backend
dockerイメージの作成を行います（あとでdocker-composeファイルにまとめてしまいたい）
1. ./backend ディレクトリで以下のコマンド実行
```bash
docker-compose build
```
2. ./backend ディレクトリで以下のコマンド実行
```bash
docker-compose run \
  --entrypoint "poetry init \
    --name backend \
    --dependency fastapi \
    --dependency uvicorn[standard] \
    --dependency python-dotenv \
    --dependency youtube-transcript-api \
    --dependency google-api-python-client \
    --dependency sqlalchemy \
    --dependency aiomysql" \
  backend
```
3. ./backend ディレクトリで以下のコマンド実行
```bash
docker-compose run --entrypoint "poetry install --no-root" backend
docker-compose build --no-cache
```

### for frontend
1. ./frontend ディレクトリで以下のコマンド実行
```bash
docker-compose build
```
2. ./frontend ディレクトリで以下のコマンド実行
```bash
docker-compose run \
  --entrypoint "npm install \
    @mui/material　\
    @emotion/react \
    @emotion/styled \
    @mui/icons-material \
    camelcase-keys \
    snakecase-keys \
    react-router-dom" \
  frontend
```
3. ./frontend ディレクトリで以下のコマンド実行
```bash
docker-compose build --no-cache
```

### others
1. backendディレクトリ直下に.envファイルを作成
2. 以下のような環境変数をセットしてください。
youtubeapiの取得方法、詳しくはこのサイト
https://qiita.com/shinkai_/items/10a400c25de270cb02e4
```
YOUTUBE_API_KEY="あなたのYOUTUBEAPIのKEY" 
```
## after that
dockerの起動
```bash
docker-compose up
```

http://localhost:3000/search でアクセス可能

http://localhost:8000/docs で swagger.ui にアクセス可能

## 残作業
- バリデーションチェック
- エラーハンドリング
- コードの整理
- テスト作成