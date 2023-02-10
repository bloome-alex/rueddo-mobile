require('dotenv').config()
const express = require('express')


const app = express()

app.use((req, res, next) => {
    const allowedOrigins = ['https://rueddo-api-production.up.railway.app/', 'https://rueddo-vuelder-production.up.railway.app', 'https://rueddo-mobile-production.up.railway.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.static('public'))

app.get('/*', (req, res) => res.redirect('/'))

app.listen(process.env.PORT, ()=>{
    console.log('App listen at port: ', process.env.PORT)
})