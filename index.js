const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

require('dotenv').config();

// connect to mongodb atlas
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected to mongodb atlas");
})
.catch((error) => {
    console.log("Error connecting to mongodb atlas", error);
})


// start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})