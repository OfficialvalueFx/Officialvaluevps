const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the Backend!');
});

// Example: Connecting to MySQL (ensure mysql2 package is installed: npm install mysql2)
/*
const mysql = require('mysql2/promise');
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'dating_app_db',
};

async function testDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Successfully connected to MySQL.');
    await connection.end();
  } catch (error) {
    console.error('Error connecting to MySQL:', error.stack);
  }
}
testDbConnection();
*/

// Example: Connecting to Redis (ensure redis package is installed: npm install redis)
/*
const redis = require('redis');
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis.');
});
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});
(async () => {
  await redisClient.connect();
  await redisClient.set('test_key', 'Hello Redis!');
  const value = await redisClient.get('test_key');
  console.log('Got from Redis:', value);
  await redisClient.quit();
})();
*/

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
