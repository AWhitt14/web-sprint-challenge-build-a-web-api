const express = require("express")
const projectModel = require('../data/helpers/projectModel')
const { projectBody, projectID } = require("../middleware/middleware")


const router = express.Router()

router.get('/',(req,res,next) => {
   projectModel.get()
   .then(projects => {
    res.status(200).json(projects)
   })
   .catch(er => {
       next(er)
   })
})

router.post('/', projectBody(), (req,res,next) => {
    projectModel.insert(req.body)
    .then(proj => {
        res.status(201).json(proj)
    })
    .catch(er => {
        next(er)
    })
} )

router.get('/:id',projectID(), (req,res,next) => {
    res.status(200).json(req.project)
} )

router.put('/:id', projectID(), (req,res,next) => {
    projectModel.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(er => {
        next(er)
    })
})

router.delete('/:id', projectID(), (req,res,next) => {
    projectModel.remove(req.params.id)
    .then(response => {
        res.status(200).json({message: 'User was deleted'})
    })
})



module.exports = router