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
        const project = projectModel.get(req.params.id)
        .then(response => {
            req.project = response;
            next()
        })
        .catch(er => {
            console.log(er);
            res.status(404).json({message: 'User not found'})
        })
   }
}

function actionId() {
    return (req,res,nect) => {
        actionModel.get(req.params.actionId)
        .then(action => {
            req.action = action;
            next()
        })
        .catch(er => {
            next(er)
        })
    }
}

module.exports = {
    projectBody, projectID, actionId
}