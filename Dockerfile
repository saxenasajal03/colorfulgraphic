# Step 1: Build the app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the app
FROM node:18

WORKDIR /app

RUN npm install -g serve

# Copy build output to working dir
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["serve", "-s", ".", "-l", "tcp://0.0.0.0:80", "--single"]

