
const Product=require('../../models/product')

const getFilterdProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
};

module.exports=getFilterdProducts;