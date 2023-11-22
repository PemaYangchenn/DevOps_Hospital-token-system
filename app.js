const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const tokenRouter = require("./routes/tokenRoutes")
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/', viewRouter)
app.use("/api/v1/tokens", tokenRouter);
app.use(express.static(path.join(__dirname,'views')))
const port = 4001
app.listen(port, () => {
    console.log(`App runnning on port ${port} ..`)
})
