const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoHandler = require('./routeHandler/todoHandler');
require('dotenv').config();
const port = process.env.PORT || 5000;

//*express app initailization
const app = express();

//*express middleware
app.use(cors());
app.use(express.json());

//*database connection with mongoose
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1hzqb.mongodb.net/todoManagement?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connection successful'))
    .catch(err => console.log(err))

// const dbConnection = mongoose.connection;
// dbConnection.once('open', () => console.log('connected to DB'));
// dbConnection.on('error', (err) => console.log(`connection error ${err}`));


//*application routes
app.use('/todo', todoHandler);

//*default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})