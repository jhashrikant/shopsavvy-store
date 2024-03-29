const mongoose = require('mongoose');

async function connectToMongoDB() {
    if (!process.env.MONGO_URL) {
        throw new Error("Mongodb Url must be defined to connect to Database")
    }
    try {
        console.log('trying to connect to DB');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongoDB');

    } catch (error) {
        console.log('line11 error', error)
        process.exit(1)
    }
}
export default connectToMongoDB;
