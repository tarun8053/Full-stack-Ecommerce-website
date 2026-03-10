const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {

    const { products, totalAmount, status, paymentMethod, razorpayPaymentId } = req.body;

    if (!Array.isArray(products) || products.length === 0 || totalAmount === undefined || !paymentMethod) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const order = new Order({
      userId: req.user.id,
      products,
      totalAmount,
      status,
      paymentMethod,
      razorpayPaymentId: paymentMethod === "COD" ? null : razorpayPaymentId
    });

    await order.save();

    res.status(201).json({
      message: "Order successfully created"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getAllOrder = async (req, res) => {
    try {

        const order = await Order.find({userId : req.user.id}).populate('products.productId');;
        if(order.length === 0) {
            return res.status(404).json({message : "not any order find"});
        }

         res.status(200).json({order});
        
    } catch (err) {
        res.status(500).json({error : err});
    }
}
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('products.productId');
        if(!order) {
            return res.status(404).json({message : "not any order find"});
        }

         res.status(200).json({order});
        
    } catch (err) {
        res.status(500).json({error : err});
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, {status}, {new : true});
        if(!order) {
            return res.status(404).json({message : "not any order find"});
        }
        res.status(201).json({message : "Status updated successfully"});

    } catch (err) {
         res.status(500).json({message : "this is upadte error", err});
    }
}

exports.getAllOrderForAdmin = async (req, res) => {
  try {

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;

    if(!req.user.isAdmin){
      return res.status(403).json({
        message : "Only admin can access all order"
      });
    }

    const skipValue = (page - 1) * limit;

    const order = await Order.find()
      .populate("products.productId")
      .skip(skipValue)
      .limit(limit)
      .sort({ createdAt: -1 })  
      
      

    res.status(200).json({ order });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};