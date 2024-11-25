const express = require('express')
const router = express.Router()
const {StatusCodes} = require('http-status-codes')

const package = require('../../../../package.json')
const path = require('path')

router.get('/', (req, res)=>{
    res.status(StatusCodes.OK).json({msg: 'Robô WhatsApp - API', version: package.version})
})



/*router.get('/socket.io', (req, res)=>{
    res.send(req.params)
})*/



/*router.get('/download/:file', (req, res)=>{
    const {file} = req.params
    const _file = path.resolve('public',file )
    res.download(_file); // Set disposition and send it.
})*/


module.exports = router