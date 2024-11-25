require('dotenv').config()
const app = require('./main')

const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT,'0.0.0.0', () => {
    console.log(`API is running on [port ${SERVER_PORT}]`);
  });
