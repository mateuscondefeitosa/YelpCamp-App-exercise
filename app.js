const express = require('express');
const path = require('path')
const mongoose = require('mongoose');


// CONECTA COM O MONGODB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// VERIFICA SE HÁ ERRO DE CONECÇÃO COM O MONGODB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected!");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.send('YELPPPP');
})

app.listen(3000, ()=>{
    console.log('Serving on port 3000');
})