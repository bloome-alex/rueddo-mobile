require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/*', (req, res) => res.redirect('/'))

app.listen(process.env.PORT, ()=>{
    console.log('App listen at port: ', process.env.PORT)
})