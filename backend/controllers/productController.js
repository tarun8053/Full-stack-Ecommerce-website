const Product = require("../models/product");


exports.getAllProduct = async(req, res) => {
  try {

    const { categoryId } = req.query;

    let filter = {};

    if(categoryId){
      filter.categoryId = categoryId;
    }

    const products = await Product.find(filter);

    res.status(200).json({
      products: products || []
    });

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createProduct = async(req, res) => {
    try {

        const {title, description, mrpPrice,  discountedPrice, categoryId, inStock, image, rating, numOfReviews } = req.body

        if(!title || !description || !mrpPrice || !discountedPrice || !categoryId || !inStock){
            return res.status(400).json({message : 'title, description, mrpPrice,  discountedPrice, categoryId, inStock, image all are required'});
        }

          if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Only admin can create categories"
            });
        }

        const product = new Product({title, description, mrpPrice,  discountedPrice, categoryId, inStock, image, rating, numOfReviews});
        await product.save();
        res.status(201).json({message : 'Product successfully created'})
        
    } catch (err) {
        res.status(500).json({error : err})
    }
}

exports.getProduct = async(req, res) => {
    try {
        const {id} = req.params; 
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message : 'No product avalible for this id'})
        }
        return res.status(200).json({product});


    } catch (err) {
         res.status(500).json({error : err});
    }
}

exports.updateProduct = async (req, res) => {

    try {
        
        const { id } = req.params;
        const {title, description, mrpPrice,  discountedPrice, categoryId, inStock, image, rating, numOfReviews, isActive } = req.body
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Only admin can create categories"
            });
        }

        const product = await Product.findByIdAndUpdate(id, {title, description, mrpPrice,  discountedPrice, categoryId, inStock, image, rating, numOfReviews, isActive});
        if(!product){
            return res.status(404).json({message : 'No product avalible for this id'})
        }
        res.status(200).json({message : 'Product Updated Successfully'})

    } catch (err) {
        res.status(500).json({error : err});
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        
        const { id } = req.params;
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Only admin can create categories"
            });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({message : 'Product is deleted'});


    } catch (err) {
         res.status(500).json({error : err});
    }
}



