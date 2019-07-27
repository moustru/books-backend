const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8002;
require('./models');
require('./routes')(app);

app.use(cors());

mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => console.error('Error connecting', err));