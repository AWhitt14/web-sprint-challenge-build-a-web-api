const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const projectRouter = require('./project/projectRouter')
const { projectID } = require('./middleware/middleware')
const actionRouter = require('./actions/actionsRouter')


const server = express()
const port = 4000 

server.use(express.json())
//server.use(logger("short"))
server.use(welcomeRouter)
server.use('/projects', projectRouter)
server.use('/projects/:id/actions', projectID(), actionRouter)

server.use((err,req,res,next) => {
	console.log(err)
	res.status(500).json({message: 'server error'})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
