const { handleImageUpload } = require("../../config");

const Product = require('../../models/product'); // Adjust the path as necessary

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, product, message:'Product created Successfuly!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,{
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            salePrice: req.body.salePrice,
            totalStock: req.body.totalStock,
          }, {
            new: true,    // Return the updated document
            runValidators: true // Validate against schema
        });
        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product, message:'Product updated Successfuly!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Upload Image
const uploadImage=async(req,res)=>{
    
    try {
        const b64=Buffer.from(req.file.buffer).toString('base64');
        const url='data:'+ req.file.mimetype + ';base64,'+b64
        result= await handleImageUpload(url);

        res.json({
            success:true,
            result:result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:'unexpected error occurred'
        })
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadImage
};
