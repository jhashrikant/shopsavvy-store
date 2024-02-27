import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    Product_name: {
        type: String,
        required: true,
        // unique: true
    }, // String is shorthand for {type: String}
    slug: {
        type: String,
        required: true,
        // unique: true
    },
    product_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },

}, { timestamps: true });

mongoose.models = {}

module.exports = mongoose.model('Product', ProductSchema);