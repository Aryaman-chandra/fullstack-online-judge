FROM node:20-alpine

WORKDIR /app

RUN apk update && apk add --no-cache \
    g++ \
    openjdk11 \
    python3 \
    py3-pip

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build
EXPOSE 5000
CMD ["npm" , "run", "start"]
