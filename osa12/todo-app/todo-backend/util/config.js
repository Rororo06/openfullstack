const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/todo-app';
const REDIS_URL = process.env.REDIS_URL;
const PORT = process.env.PORT || 3000;

module.exports = { MONGO_URL, REDIS_URL, PORT };
