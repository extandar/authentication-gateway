# Api for authentication microservice

## Methods

### password

The implementations have refresh token flow

## Routes

GET /api/PREFIX/ping
POST /api/PREFIX/signup
POST /api/PREFIX/signin
POST /api/PREFIX/token/refresh
POST /api/PREFIX/test/user

## Routemap

- password method
	- forgot password
	- password reset
	- verify email
	- verify phone

- otp method
	- signin
	- signup with email code
	- signup with phone code

- firebase method
- anonymous method

## Enviroment

- NODE_ENV=development
- LOG_FILE=/app/logs/deploy.logs
- CORS=*
- API_PREFIX=test/auth
- SERVICE_PORT=XXX
- MONGO_HOST=XXX.XXX.XXX.XXX
- MONGO_PORT=27017
- MONGO_USER=XXX
- MONGO_PASSWORD=XXX
- MONGO_DATABASE=XXX
- MONGO_AUTH_SOURCE=XXX
- GITHUB_USER=XXX
- GITHUB_TOKEN=XXX
- GITHUB_REPOSITORY=XXX
- GITHUB_BRANCH=XXX
- AWS_ACCESS_KEY_ID=XXX
- AWS_SECRET_ACCESS_KEY=XXX
- ASW_REGION=us-west-2
- ASW_BUCKET_NAME=XXX
- ASW_BUCKET_PREFIX=XXX
- SECRET_KEY=XXX
- ACCESS_TOKEN_TIME_EXPIRE=300s
- REFRESH_TOKEN_TIME_EXPIRE=3600s
- LOG_TRANSPORTS=
- LOG_API_ENDPOINT=
- LOG_API_KEY=
- MESSENGER_API_ENDPOINT=
- MESSENGER_DEFAULT_SENDER=
