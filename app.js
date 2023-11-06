const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/', viewRouter)
app.use(express.static(path.join(__dirname,'views')))
const port = 4001
app.listen(port, () => {
    console.log(`App runnning on port ${port} ..`)
})