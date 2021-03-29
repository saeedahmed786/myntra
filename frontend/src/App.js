import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DefaultComp } from './Components/404'
import { About } from './Components/About'
import { AdminPanel } from './Components/Admin/AdminPanel'
import {EditProduct} from './Components/Admin/editProduct'
import { GetBrands } from './Components/Admin/GetBrands'
import { GetCategory } from './Components/Admin/GetCategories'
import { GetProducts } from './Components/Admin/GetProducts'
import { PriceRanges } from './Components/Admin/GetPriceRanges'
import { Users } from './Components/Admin/Users'
import { Home } from './Components/Homepage/Home'
import { Navbar } from './Components/Navbar'
import { Product } from './Components/Product'
import { Products } from './Components/Products'
import { Wishlist } from './Components/wishlist'
import { ProductCart } from './Components/ProductCart'
import { Coupans } from './Components/Admin/Coupans'
import { Test } from './Components/Test'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import AdminRoute from './Components/AdminRoute'

 const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <div style = {{marginTop: '90px'}}>
      <Switch>
      <Route exact path = '/' component = {Home}/>
      <AdminRoute exact path = '/admin' component = {AdminPanel}/>
      <AdminRoute exact path = '/admin/all-categories' component = {GetCategory}/>
      <AdminRoute exact path = '/admin/all-brands' component = {GetBrands}/>
      <AdminRoute exact path = '/admin/all-price-range' component = {PriceRanges}/>
      <AdminRoute exact path = '/admin/get-products' component = {GetProducts}/>
      <AdminRoute exact path = '/admin/product/edit/:id' component = {EditProduct}/>
      <AdminRoute exact path = '/admin/users' component = {Users}/>                                                       
      <AdminRoute exact path = '/admin/coupans' component = {Coupans}/>                                                       
      <Route exact path = '/products/:id' component = {Products}/>
      <Route exact path = '/product/:id' component = {Product}/>
      <Route exact path = '/cart' component = {ProductCart}/>
      <Route exact path = '/wishlist' component = {Wishlist}/>
      <Route exact path = '/about' component = {About}/>
      <Route exact path = '/about' component = {About}/>
      <Route exact path = '/test' component = {Test}/>
      <Route exact path = '/login' component = {Login}/>
      <Route exact path = '/signup' component = {Signup}/>
       <Route component = {DefaultComp}/>
      </Switch>
      </div>
      </BrowserRouter>
    </div>

  )
}

export default App;