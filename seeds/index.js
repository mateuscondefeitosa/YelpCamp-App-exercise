const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')


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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6113e30fb8273825c06a3bc4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'JUST A SEED CAMPGROUND',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drnsdu8lq/image/upload/v1628885702/YelpCamp/dtolp0kutelqg5wnk5ca.jpg',
                    filename: 'YelpCamp/xohmkzyrpi7tggvzoxbm'
                },
                {
                    url: 'https://res.cloudinary.com/drnsdu8lq/image/upload/v1628885702/YelpCamp/dtolp0kutelqg5wnk5ca.jpg',
                    filename: 'YelpCamp/l4bcj8els4uxicusx11m'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})