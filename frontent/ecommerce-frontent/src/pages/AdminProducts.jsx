import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../Componet/AdminHeader";
import "../styles/adminproduct.css";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mrpPrice, setMrpPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 3;
  const totalPage = Math.ceil(products.length / perPage);

  // ===============================
  // Fetch Products
  // ===============================

  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/product/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setProducts(res.data.products);

    } catch (error) {
      console.log("error fetching products", error);
    }
  };

  // ===============================
  // Fetch Categories
  // ===============================

  const fetchCategories = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/categories/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCategories(res.data.categories);

    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // Create Product
  // ===============================

  const createProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/product/create`,
        {
          title,
          description,
          mrpPrice,
          discountedPrice,
          categoryId,
          inStock,
          image: [image],
          rating: 0,
          numOfReviews: 0
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setTitle("");
      setDescription("");
      setMrpPrice("");
      setDiscountedPrice("");
      setCategoryId("");
      setImage("");
      setInStock(true);

      fetchProducts();

    } catch (error) {
      console.log("error creating product", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

    const filterd = products.slice((page - 1) * perPage , page * perPage);

    const handlePrev = () => {
        if(page === 1) return;
        setPage(page - 1)
    }

    const handleNext = () => {
        if(page === totalPage) return;
        setPage(page + 1)
    }

  return (
    <div>

      <AdminHeader />

      <div className="admin-product-page">

        <h1>Create Product</h1>

        <form onSubmit={createProduct} className="product-form">

          <input
            type="text"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="MRP Price"
            value={mrpPrice}
            onChange={(e) => setMrpPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Discounted Price"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
          />

          {/* Category dropdown */}

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >

            <option value="">Select Category</option>

            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}

          </select>

          {/* Image URL */}

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {/* Stock status */}

          <select
            value={inStock}
            onChange={(e) => setInStock(e.target.value === "true")}
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          <button type="submit">
            Create Product
          </button>

        </form>


        <h2>All Products</h2>

        <table className="product-table">

          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>MRP</th>
              <th>Discount Price</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filterd.map(prod => {

              const category = categories.find(
                cat => cat._id === prod.categoryId
              );

              return (
                <tr key={prod._id}>

                  <td>
                    <img
                      src={prod.image?.[0]}
                      alt={prod.title}
                      width="50"
                    />
                  </td>

                  <td>{prod.title}</td>
                  <td>₹{prod.mrpPrice}</td>
                  <td>₹{prod.discountedPrice}</td>

                  <td>
                    {category ? category.title : "N/A"}
                  </td>

                  <td>
                    {prod.inStock ? "In Stock" : "Out of Stock"}
                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

        <div className="pagination">
          <button 
            className="btn prev" 
            onClick={handlePrev} 
            disabled={page === 1}
          >
            ← Prev
          </button>

          <span className="page-info">
            {page} <span>of</span> {totalPage}
          </span>

          <button 
            className="btn next" 
            onClick={handleNext} 
            disabled={page === totalPage}
          >
            Next →
          </button>
        </div>

      </div>

    </div>
  );
}