import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import Header from "../Componet/Header";
import Footer from "../Componet/Footer";
import axios from "axios"

export default function Cart() {

const [cartItems, setCartItems] = useState([]);
const [totalValue, setTotalValue] = useState(0);
const [paymentMethod, setPaymentMethod] = useState("");


useEffect(() => {
const storedCart = localStorage.getItem("cart");

if (storedCart) {
  const parsed = JSON.parse(storedCart);
  setCartItems(parsed);
  calculateTotal(parsed);
}

}, []);

const calculateTotal = (items) => {
const total = items.reduce(
(sum, item) => sum + item.discountedPrice * item.quantity,
0
);
setTotalValue(total);
};

const updateQuantity = (id, type) => {
const updated = cartItems.map((item) => {


  if (item._id === id) {

    if (type === "inc") item.quantity += 1;

    if (type === "dec" && item.quantity > 1) item.quantity -= 1;

  }

  return item;
});

setCartItems(updated);
localStorage.setItem("cart", JSON.stringify(updated));
calculateTotal(updated);


};

const removeItem = (id) => {
const filtered = cartItems.filter((item) => item._id !== id);


setCartItems(filtered);
localStorage.setItem("cart", JSON.stringify(filtered));
calculateTotal(filtered);


};

const handleCheckout = () => {

  if (!paymentMethod) {
    alert("Please select payment method");
    return;
  }

  if (paymentMethod === "cod") {

        axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/order/create`,{

        products: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity
        })),

        totalAmount: totalValue,
        paymentMethod: "COD"

        },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res => {

            console.log("Order created successfully (COD)", res.data)

            localStorage.removeItem("cart")
            setCartItems([])
            setTotalValue(0)
            window.location.href = '/order'

        })
        .catch(error =>{
            console.log("Order Api error", error.response?.data || error)
        })

  }

  if (paymentMethod === "razorpay") {

    const options = {
      key: "rzp_test_PV1oQ0oMtgXOsq",
      amount: totalValue * 100,
      currency: "INR",
      name: "Shophub pvt.",
      description: "Order Payment",
      image:
        "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",

      handler: function (response) {

        alert("Payment Successful "+ response.razorpay_payment_id);
       axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/order/create`,{

        products: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity
        })),

        totalAmount: totalValue,
        paymentMethod: "Rozerpay",
        razorpayPaymentId: response.razorpay_payment_id

        },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res => {

            console.log("Order created successfully", res.data)

            localStorage.removeItem("cart")
            setCartItems([])
            setTotalValue(0)
            

        })
        .catch(error =>{
            console.log("Order Api error", error.response?.data || error)
        })
                
                

      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }
};

return ( 
<div>
    <Header/>

    <div className="cart-page">


  <div className="cart-products">

    <h2 className="cart-heading">Shopping Cart</h2>

    {cartItems.length === 0 && (
      <p className="empty-cart">Your cart is empty</p>
    )}

    {cartItems.map((item) => (

      <div className="cart-item" key={item._id}>

        <img
          src={item.image[0]}
          alt={item.title}
          className="product-img"
        />

        <div className="product-info">
          <h3>{item.title}</h3>
          <p className="price">₹{item.discountedPrice}</p>

          <div className="qty-box">

            <button
              onClick={() => updateQuantity(item._id, "dec")}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item._id, "inc")}
            >
              +
            </button>

          </div>

          <button
            className="remove-btn"
            onClick={() => removeItem(item._id)}
          >
            Remove
          </button>

        </div>

        <div className="item-total">
          ₹{item.discountedPrice * item.quantity}
        </div>

      </div>
    ))}

  </div>


  <div className="cart-summary">

    <h3>Order Summary</h3>

    <div className="summary-row">
      <span>Total Amount</span>
      <span className="total">₹{totalValue}</span>
    </div>

    <div className="divider"></div>

    <p className="payment-title">Payment Method</p>

    <label className="payment-option">
      <input
        type="radio"
        name="payment"
        value="razorpay"
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      Razorpay (UPI / Card)
    </label>

    <label className="payment-option">
      <input
        type="radio"
        name="payment"
        value="cod"
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      Cash on Delivery
    </label>

    <button
      className="checkout-btn"
      onClick={handleCheckout}
    >
      Proceed to Checkout
    </button>

  </div>

</div>


    <Footer/>
</div>

);
}
