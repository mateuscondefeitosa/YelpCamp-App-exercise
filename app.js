const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const Campground = require('./models/campground')


// CONECTA COM O MONGODB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// VERIFICA SE HÁ ERRO DE CONECÇÃO COM O MONGODB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected!");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('YELPPPP');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});


// PARA CRIAR UM NOVO ITEN (C)
app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req,res)=>{
// NECESSARIO PARSE  (app.use)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

// Procurar por ID (R)
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});







app.listen(3000, () => {
    console.log('Serving on port 3000');
})