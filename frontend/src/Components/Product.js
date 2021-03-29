import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Image, message, notification } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import Search from 'antd/lib/input/Search';
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom';
import swal from 'sweetalert';
import { listProducts, wishlistProducts } from './Redux/Redux';


const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

export const Product = (props) => {
    const productId = props.match.params.id;
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});
    const [productColors, setProductColors] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [productPictures, setProductPictures] = useState([]);
    const [sizeToShop, setSizeToShop] = useState('');
    const [messages, setMessages] = useState('');
    const getProducts = () => {
        const reponse =  axios.get(`/api/products/product/${productId}`).then(res => {
            setProduct(res.data);
            setProductColors(res.data.productColors);
            setProductPictures(res.data.productPictures);
            setProductSizes(res.data.productSizes);
            setCategory(res.data.category);
        })
    }
    const dispatch = useDispatch('');
    useEffect(() => {
        getProducts();
        return () => {
            
        }
    }, [productId]);

     
    const onSearch = () => {

    }


    const openCartNotificationSuccess = placement => {
        notification.success({
          message: messages,
          placement,
        });
      };
      const openCartNotificationAlreadyExists = placement => {
        notification.info({
          message: messages,
          placement,
        });
      };
    
      const openNotificationWishListSuccess = placement => {
        notification.success({
          message: messages,
          placement,
        });
      };
      const openNotificationWishListAlreadyExist = placement => {
        notification.info({
          message: messages,
          placement,
        });
      };

      const handleCart = async () => {
        let data = new FormData();
        data.append('title', product.title);
        data.append('subTitle', product.subTitle);
        data.append('price', product.price);
        data.append('offer', product.offer);
        data.append('offPrice', product.offPrice);
        data.append('priceAfterOff', product.priceAfterOff);
        data.append('coupan', product.coupan);
        data.append('coupanDiscount', product.coupanDiscount);
        data.append('cat', product.category.name);
        data.append('brand', product.brand.name);
        data.append('image', product.productPictures[0].img)
        data.append('sizeToShop', sizeToShop);
        for(let sizes of productSizes) {
            console.log(sizes.size);
          data.append('sizes', sizes.size);
         }
        await axios.post('/api/cart/post', data).then(res => {
            if(res.status === 200) {
                swal('success', 'Product add to Cart successfully', 'success');
                dispatch(listProducts());
            
            }
            else {
            
                swal('Error', res.data.errorMessage , 'info');
            } 
            
            
        })
    }

    const handleWishlist = async () => {
        let data = new FormData();
        data.append('title', product.title);
        data.append('subTitle', product.subTitle);
        data.append('price', product.price);
        data.append('offPrice', product.offPrice);
        data.append('priceAfterOff', product.priceAfterOff);
        data.append('coupan', product.coupan);
        data.append('coupanDiscount', product.coupanDiscount);
        data.append('offer', product.offer);
        data.append('cat', product.category.name);
        data.append('brand', product.brand.name);
        data.append('image', product.productPictures[0].img)
        data.append('sizeToShop', sizeToShop);
        for(let sizes of productSizes) {
          data.append('sizes', sizes.size);
         }
        await axios.post('/api/wishlist/post', data).then(res => {
            console.log(res);
            if(res.status === 200) {
                swal('success', 'Product add to Wishlist successfully', 'success');
                dispatch(wishlistProducts());
            }
            else {
            
                swal('Error', res.data.errorMessage , 'info');
            } 

            
        })
    }

    return (
        <div>
         <Breadcrumb className = 'my-2 mx-4'>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
                 <Breadcrumb.Item>
                        <span>{category.name}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <span>{product.title}</span>
                        </Breadcrumb.Item>
        </Breadcrumb>
         <div className = 'row'>
             <div className = 'col-md-7'>
             <div className = 'row'>
                 {
                     productPictures.map(pic => {
                         return(
                             <div className = 'col-md-6 mb-4 pl-4'>
                             <Image.PreviewGroup>
                                    <Image
                                    height = {560}
                                    width = {380}
                                     src={pic.img}
                                        />
                                        
                               </Image.PreviewGroup>   
                             </div>
                          
                         )
                     })
                 }
                 </div>
             </div>
             <div className="col-md-5 mt-2 pl-4">
             <div className = 'ml-3'>
                <h4>
                    {product.title}
                </h4>
                <h5 className = 'text-muted'>
                    {product.subTitle}
                </h5>
                <h5 className = 'mt-2'>
                    Rs. {product.price}  ({product.offer}% Off)
                </h5>
                <h6 style = {{color: '#03a685'}} className = 'font-weight-bold'>
                    Inclusive of all taxes
                </h6>
                
                <div className = 'mt-4'>
                    <h5>Select Size</h5>
                      {
                          productSizes.map(size => {
                              return(
                                <button onClick = {() => setSizeToShop(size.size)} className = 'btn btn-outline-danger mx-2' style = {{borderRadius: '180px', border: '2px solid gray', width: '60px', height: '60px'}}>
                                {size.size}
                                </button>

                              )
                          })
                      }
                   
                </div>
                <div className = 'product-btn mt-5'>
                    <Button onClick = {() => { sizeToShop ? handleCart() : swal('Note', 'Please Select Size first', 'info')}} size = 'large' icon = {<i className="fas fa-shopping-bag mr-2"></i>}>
                        Add to Bag
                    </Button>
                    <Button onClick = {() => {sizeToShop ? handleWishlist(): swal('Note', 'Please Select Size first', 'info')}} className = 'product-btn-wishlist ml-2' icon = {<i className="far fa-heart fa-1x mr-2"></i>}>
                        Add to Wishlist
                    </Button>
                </div>
                <div className = 'delivery'>
                    <h4>Delivery Options <i className="fas fa-truck ml-1"></i></h4>
                    <Search size = 'large' placeholder="Enter Your Area Code" onSearch={onSearch} style={{ width: 200 }} />
                    <p className = 'mt-4'>100% Original Products</p>
                    <p>Free Delivery on order above Rs. 799</p>
                    <p>Pay on delivery might be available</p>
                    <p>Easy 30 days returns and exchanges</p>
                    <p>Try & Buy might be available</p>
                </div>
                <div>
                    <p>
                        { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} /> }
                    </p>
                </div>
            </div>
               
             
                </div>
         
        
        </div>
        </div>
    )
}
