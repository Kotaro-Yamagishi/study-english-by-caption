## 概要
### 目的
このアプリは私が英語学習時にYoutubeのcaptionを事前に取得し、分からない単語を事前に把握してから視聴したいという思いから作成したアプリです
完全に個人用なので改良の余地しかないです。

### 使い方のイメージ
1. captionを取得したいyoutubeビデオのidを取得し、検索
2. captionページにて字幕が出力されるので、分からない単語があれば範囲選択し、検索ボタンを押下。すると、その単語の定義や使い方の例、対義語や類義語を取得することが可能です
3. 覚えておきたい単語があればvocabularyに追加することができます
4. 気になったり後で見返したい動画があればお気に入り一覧に追加することができ、簡単にアクセスすることができます

### 今後の機能的改良
- 分からない単語をフラッシュカードのように出力できるようにし、単語テストできるようにする

### 残作業
- バリデーションチェック
- エラーハンドリング
- UIの改善
- コードの整理
- テスト作成

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
