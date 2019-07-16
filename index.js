const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3010
const mongo = process.env.MONGODB || 'mongodb://localhost/my-series'
const bodyParser = require('body-parser')

const pages = require('./routes/pages')
const series = require('./routes/series')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//process request body
app.use(bodyParser.urlencoded({ extended: true }))

//assets
app.use(express.static('public'))

// view engine - EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', pages)
app.use('/series', series)

mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log('Listening on: ' + port)
        })
    })
    .catch(err => {
        console.log(err)
    })