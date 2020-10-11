const express = require('express')
const projectModel = require('../data/helpers/projectModel')
const actionModel = require('../data/helpers/actionModel')
const { } = require('../middleware/middleware')

const router = express.Router()

router.get('/',(req,res,next) => {
    projectModel.getProjectActions(req.project.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(er => {
        next(er)
    })
})

router.get('/:actionId',(req,res,next) => {
    res.status(200).json(req.action)
})





module.exports = router;
