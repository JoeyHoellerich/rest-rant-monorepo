// Modules and Globals
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const defineCurrentUser = require('./middleware/defineCurrentUser')
//const cookieSession = require('cookie-session')

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

// Middleware
// app.use(cookieSession({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET],
//     maxAge: 24*60*60*1000 // 24 hours in milliseconds
// }))


// Controllers & Routes

app.use('/places', require('./controllers/places'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})