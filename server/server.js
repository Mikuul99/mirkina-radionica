require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/connection');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

// db connectivity
dbConnection();

// cors
app.use(cors());

// request payload middleware
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/product', require('./routes/productRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'))

app.get('/', (req, res, next) => {
    res.send('Hello from Node Server');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// error handling middleware
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    })
})