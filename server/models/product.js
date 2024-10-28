const mongoose=require('mongoose');


const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true, // Field is required
        trim: true      // Remove whitespace
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0           // Price should be a positive number
    },
    salePrice: {
        type: Number,
        min: 0           // Sale price should also be a positive number
    },
    totalStock: {
        type: Number,
        default: 0,      // Default to 0 if no stock is provided
        min: 0           // Stock cannot be negative
    },
    
},{ timestamps: true });


const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;