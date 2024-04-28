docker-compose run \
  --entrypoint "poetry init \
    --name demo-app \
    --dependency fastapi \
    --dependency uvicorn[standard] \
    --dependency python-dotenv \
    --dependency youtube-transcript-api \
    --dependency google-api-python-client" \
  demo-app

docker-compose run --entrypoint "poetry install --no-root" demo-app

docker-compose build --no-cache