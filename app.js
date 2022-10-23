const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnect = require('./config/mongo')
const app = express()
const {router} = require('./routes')
const morganBody = require('morgan-body')
const loggerStream = require('./utils/handleLogger')

app.use(cors())
app.use(express.json())
app.use(express.static('storage'))


morganBody(app,{
    noColors:true,
    stream:loggerStream,
    skip: function(req,res){
        return res.statusCode < 400
    }

})

const port = process.env.PORT ||3000

//routes import 
app.use('/v1', router)



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
dbConnect()