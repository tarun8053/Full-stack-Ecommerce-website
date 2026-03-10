import React from 'react'
import Login from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Products from './pages/Products'
import Category from './pages/Category'
import AddToCart from './pages/AddToCart'
import Order from './pages/Order'
import AllProduct from './pages/AllProduct'
import Admin from './pages/AdminDashBoard'
import AdminCategories from './pages/AdminCategories'
import AdminProducts from './pages/AdminProducts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/cart' element={<AddToCart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/Allproduct' element={<AllProduct/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admincategories' element={<AdminCategories/>}/>
        <Route path='/adminproduct' element={<AdminProducts/>}/>
      </Routes>
    </BrowserRouter>
  )
}
