const projectModel = require('../data/helpers/projectModel')
const actionModel = require('../data/helpers/actionModel')

function projectBody() {
    return (req,res,next) => {
        if (req.body.name || req.body.description) {
            next()
        } else {
            res.status(400).json({message: 'Project requires a name and description'})
        }
    }
}

function projectID() {
   return (req,res,next) => {
        projectModel.get(req.params.id)
        .then(response => {
            req.project = response;
            next()
        })
        .catch(er => {
            res.status(404).json({message: 'User not found'})
        })
   }
}

function actionBody() {
    return (req,res,next) => {
        req.body = {...req.body, project_id: req.project.id,}
        if (req.body.project_id || req.body.description || req.body.notes || req.body.completed) {
            next()
        } else {
            res.status(400).json({message: 'Action requires description, notes , project_id, and completed'})
        }
    }
}

function actionId() {
    return (req,res,next) => {
        actionModel.get(req.params.actionId)
        .then(action => {
            req.action = action;
            next()
        })
        .catch(er => {
            res.status(404).json({message: 'Action not found'})
        })
    }
}

module.exports = {
    projectBody, projectID, actionId, actionBody
}