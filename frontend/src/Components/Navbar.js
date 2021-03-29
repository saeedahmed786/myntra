import axios from 'axios';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Badge, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, wishlistProducts } from './Redux/Redux';
import { DownOutlined } from '@ant-design/icons';
import { isAuthenticated, logout } from './auth';



export const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const productsList = useSelector(state => state.productsList);
  const { products, loading, error } = productsList;
  
  const wishlistReducer = useSelector(state => state.wishlistReducer);
  const { wishProducts } = wishlistReducer;
  const cart = products.getCart ? products.getCart.length : 0;
  const wishlist = wishProducts.getWish ? wishProducts.getWish.length : 0;
  console.log(wishProducts);

  const fetchCategories = () => {
    axios.get('/api/categories').then(data => {
      setCategories(data.data);
    })
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    dispatch(wishlistProducts());
    

    return () => {

    }
  }, []);

  useEffect(() => {
    fetchCategories();
    
    return () => {
    
    }
  }, []);
   
  const menu = (
      <div className = 'navMenu'>

          {
            isAuthenticated() 
            ?
            <Menu style = {{width: '220px', paddingTop: '10px'}}>
            <Menu.Item>
              <Link to="/profile">
              <h6>Hello {isAuthenticated().firstName}</h6>
            </Link>
              
              <div style = {{borderBottom: '1px solid #eaeaec', paddingTop: '0px'}}></div>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                Orders
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                Wishlists
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                Gift Cards
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/contact">
                Contact Us
              </Link>
              <div style = {{borderBottom: '1px solid #eaeaec', paddingTop: '20px'}}></div>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                Myntra Credit
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                Coupans
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">
                Saved Cards
              </Link>
             </Menu.Item> 
              <div style = {{borderBottom: '1px solid #eaeaec', paddingTop: '20px'}}></div>
              <Menu.Item>
              <Link to="/">
                Edit Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a href = '/login' onClick = {(e) => {logout(() => {})}}>
                Logout
              </a>
            </Menu.Item>
            </Menu>

            :
          <Menu style = {{padding: '10px'}}>
          <h6>Welcome</h6>
           <p>To access account and manage orders</p>
          <Menu.Item>
            <Link to="/login" style = {{border: '1px solid #ff3e6c', color: '#ff3e6c !important', padding: '8px'}}>
            Login/Signup
          </Link>
            
            <div style = {{borderBottom: '1px solid #eaeaec', paddingTop: '20px'}}></div>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              Orders
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              Wishlists
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              Gift Cards
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/contact">
              Contact Us
            </Link>
            <div style = {{borderBottom: '1px solid #eaeaec', paddingTop: '20px'}}></div>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              Myntra Credit
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              Coupans
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              Saved Cards
            </Link>
          </Menu.Item>
          </Menu>
          }
          </div>
       )
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
        <Link className="navbar-brand" to="/">M</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto list-unstyle pt-3" style = {{fontSize: '12px'}}>
                       
                        
                    {
                      categories.map(data => {
                        return (
                          <li className='nav-item'> 
                          <div className="dropdown">
                            <a className = 'nav-link' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {data.name}
                            </a>
                           
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         
                        <div className = 'row' style = {{width: '90vw'}}> 
                         
                           
                        {
                          data.children.length > 0 ?
                              data.children.map(sub => {

                                return (
                                  <>
                                  <div className = 'col-md-2 font-weight-bold' key={data.id} style = {{fontSize: '12px'}}>
                                  <a className="dropdown-item text-danger" style = {{fontSize: '12px'}} key={sub.id} to="/">{sub.name}</a>
                                   
                                   {
                                     sub.children.length > 0 ?
                                     sub.children.map(child => {
                                       return(
                                       <p> 
                                       <Link to = {'/products/' + child._id} className='child'>{child.name}</Link>
                                       </p>
                                          
                                         
                                       )
                                     }) :
                                     null
                                   }
                                   </div>
                                  </>
                                   
                                )
                              }) : null

                        }   
                        
                        

                          </div>  
                      </div>
                      </div>
                      </li>
                 
                        )
                      })

                    
                    }
                
            <form className="d-flex form-search">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
              <input className="form-control mr-sm-2" type="search" placeholder= "Search" aria-label="Search"/>
            </form>
            <li className = 'nav-item profile ml-5' style = {{fontWeight: 'normal'}}>
            <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <i className="fas fa-user" style = {{paddingLeft: '11px'}}/><br/><span style = {{fontSize: '14px'}}>Profile</span>
            </a>
          </Dropdown>
             
            </li>
            <li className = 'ml-3'>
           <a href = '/wishlist'>
           <Badge count={wishlist}>
             <i className="fas fa-ribbon mr-2" style = {{paddingLeft: '12px'}}></i>
             </Badge>
             <br/>
             <span style = {{fontSize: '14px'}}>Wishlist</span></a> 
            </li>
              <li className = 'ml-2 mt-1'>
              <Badge count={cart}>
                <a href = '/cart'><i className="fas fa-shopping-cart pb-1"></i><br/><span style = {{fontSize: '14px'}}>
                  Bag 
                  </span>
                  </a>
  
                  </Badge>
               
              </li>
            
           
            </ul>
            </div>   

         
      </nav>


    </div>
  )
}
