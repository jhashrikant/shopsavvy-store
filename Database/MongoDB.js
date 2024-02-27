const mongoose = require('mongoose');
// import mongoose from 'mongoose';

async function connectToMongoDB() {
    try {
        console.log('trying to connect to DB', 'line6');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongoDB');

    } catch (error) {
        console.log('catch block ran line15')
        console.log('line11 error', error)
    }
}


// function connectToMongoDB() {
//     mongoose.connect('mongodb+srv://shrikantjha:Shri%402611@cluster0.tcae4gn.mongodb.net/Shopsavvy', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(()=>{
//         console.log('connected to MongoDb',res)
//     })
//     .catch((error)=>{
//         console.error(error)
//     })

// }



export default connectToMongoDB;
