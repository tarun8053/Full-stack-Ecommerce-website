const addToCartToLoacalStroage = (product) => {
    let cart  = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item._id === product._id)
    if(existingProductIndex !== -1){
        cart[existingProductIndex].quantity += 1;
    }else{
        cart.push({...product, quantity: 1})
    }
        localStorage.setItem("cart", JSON.stringify(cart))
}

const getCartFromLocalStroage = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

const removeCartFromLocalStroage = (productId) =>{
    let cart  = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart))
}

export { addToCartToLoacalStroage , getCartFromLocalStroage, removeCartFromLocalStroage}