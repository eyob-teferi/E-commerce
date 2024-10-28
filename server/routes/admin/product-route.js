const express=require('express');

const {uploadImage,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct}=require('../../controllers/admin/products-controller')

const{upload}=require('../../config')


const route=express.Router();


route.post('/upload',upload.single('my_file'),uploadImage);
route.post('/create-product', createProduct);       // Create a new product
route.get('/get-all-products', getAllProducts);       // Get all products
route.get('/get/:id', getProductById);   // Get a product by ID
route.put('/update/:id', updateProduct);     // Update a product by ID
route.delete('/delete/:id', deleteProduct);  // Delete a product by ID


module.exports=route;







