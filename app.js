const express = require("express")
const path = require('path')
const app = express();
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use(express.static(path.join(__dirname, 'views')))
app.use('/', viewRouter)


module.exports = app;