require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');  
const userRoutes = require('../routes/user.js');
const postRoutes = require('../routes/postRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000



app.use(express.static('public'));
app.use('/users', userRoutes); 

app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.get('/', (req, res) => {
    const data = [
        { name: 'Item 1', value: 'Value 1'},
        { name: 'Item 2', value: 'Value 2'},
        { name: 'Item 3', value: 'Value 3'}
    ];
    const homePage = require('./views/home.js');
    res.send(homePage(data));
  });

const routesFiles = fs.readdirSync('./routes');
routesFiles.forEach((file) => {
    if (file.endsWith('Routes.js')) {
        const route = require(`./routes/${file}`);
        const routePath = `${file.replace('Routes.js', '').toLowerCase()}`;
        app.use(routePath, route);
    }
})

 

 app.use('/post', postRoutes);
// app.use('/comment', commentRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({error: err.message || 'Internal Server Error'});
});


app.listen(PORT, () => {
  console.log(`Server is Live on ${PORT}`);
});
