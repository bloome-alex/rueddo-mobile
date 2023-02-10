require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())

app.use(express.static('public'))

app.get('/*', (req, res) => res.redirect('/'))

app.listen(process.env.PORT, ()=>{
    console.log('App listen at port: ', process.env.PORT)
})