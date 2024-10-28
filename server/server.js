const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoute=require('./routes/auth/auth');
const adminProductsRoute=require('./routes/admin/product-route');
const shopProductRoute=require('./routes/shop/product-route')


mongoose.connect('mongodb://localhost:27017/E-commerce')
.then(res=>console.log('mongoDB connected'))
.catch(err=>console.log(err))

const app=express();
const PORT=process.env.PORT || 5000;

app.use( 
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "Content-Type",
            "Authorization", // Corrected spelling
            "Cache-Control",  // Ensure this is included
            "Expires",
            "Pragma"          // Corrected spelling
        ],
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/admin/products',adminProductsRoute)
app.use('/api/shop/products',shopProductRoute)









app.listen(PORT ,()=>{
    console.log(`Server is running now on ${PORT}`)
})