const express = require('express')
const helmet = require('helmet')
const cors = require('cors');




const fnRouterConfig = require('./api/routes/routes')
const {clientWP} = require('./api/controller/message')
const {client, waitAuth} = require('./utils/clienteWP')
  
const app = express()

const corsOptions = {
    cors: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use( helmet() )
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({
  extended: true
}));

const configure = async ()  => {
  await waitAuth()
  clientWP(client)
  fnRouterConfig({app, io: {}} )
}

configure()

module.exports = app