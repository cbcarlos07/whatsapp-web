


const router = require('express').Router()
const controller = require('../../controller/message')
const prefix = '/message'

router.post(`${prefix}`, controller.welcome)
router.post(`${prefix}/media`, controller.sendMedia)

module.exports = router

