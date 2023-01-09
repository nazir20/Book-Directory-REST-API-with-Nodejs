const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();
const app = express();


app.use(express.urlencoded({extended:false}));

/** * * * * * * * * * * * * *@ROUTES * * * * * * * * * * * * */
app.use('/api/v1/', bookRoutes);
app.all('*', (req, res)=>{
    res.send('404 error! Invalid request')
});



/** * * * * * * * * * * * * *@PORT * * * * * * * * * * * * */
const PORT  = 8000 || process.env.PORT;

const startServer = async ()=>{
    try{
        /** * * * * * * * * * * * * * *@db * * * * * * * * * * * * *  */
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('Connected to db');
        }).catch((e)=>{
            console.log('Could not connect to db. Error: ' + e);
        })
        app.listen(PORT, ()=>{
            console.log(`The app is running on port ${PORT}`);
        });
    }catch(e){
        console.log(e);
    }
}

startServer();