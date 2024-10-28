const express=require('express');

const getFilterdProducts=require('../../controllers/shop/products-controller')

const route=express.Router();

route.get('/get-filterd-products',getFilterdProducts );       // Get all products



module.exports=route;
