require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api', router)

// оброботчик ошибок - последний мидлвейр дыльше не идем, поэтому не вызываем next

app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, console.log(`Server was started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()
