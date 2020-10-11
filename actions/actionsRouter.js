const express = require('express')
const projectModel = require('../data/helpers/projectModel')
const actionModel = require('../data/helpers/actionModel')
const { actionId, actionBody } = require('../middleware/middleware')

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

router.get('/:actionId', actionId(),(req,res,next) => {
    res.status(200).json(req.action)
})

router.post('/', actionBody(),(req,res,next) => {
    actionModel.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
})

router.put('/:actionId', actionId(),(req,res,next) => {
    actionModel.update(req.params.actionId, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(er => {
        next(er)
    })
})

router.delete('/:actionId', actionId(),(req,res,next) => {
    actionModel.remove(req.params.actionId)
    .then(x => {
        res.status(200).json({message: 'Action was deleted'})
    })
    .catch(er => {
        next(er)
    })
})





module.exports = router;
