version: '3.8'

services:
  nest-app:
    container_name: nest-app
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_HOST=shuttle.proxy.rlwy.net
      - DATABASE_PORT=46264
      - DATABASE_USERNAME=root
      - DATABASE_PASSWORD=fvLpmlWMRBtsCMlVUuhSaeJeRwtkAoFc
      - DATABASE_NAME=railway
    restart: always
