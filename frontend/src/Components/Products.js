import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb, Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import FormList from 'antd/lib/form/FormList';
import Modal from 'antd/lib/modal/Modal';


export const Products = (props) => {
  const catId = props.match.params.id;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  const [count, setCount] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
    fetchPriceRanges();
    return () => {
      
    }
  }, [catId]);
  
  const getProducts = async() => {
    axios.get(`/api/products/get/${catId}`).then(res => {
      setProducts(res.data.findProducts);
    })

  }

  const getCategories = async() => {
    axios.get(`/api/categories/`).then(res => {
      setCategories(res.data);
    })

  }

  const getBrands = async() => {
    axios.get(`/api/categories/brands`).then(res => {
      setBrands(res.data.brands);
    })

  }
  
const onChangeCatBox = (catId) => {
  axios.get(`/api/products/get/${catId}`).then(res => {
    
      setProducts(res.data.findProducts);
  });
}


  const onChangeBrandBox = (brandId) => {
    axios.get(`/api/products/productsByBrand/get/${brandId}`).then(res => {
          setProducts(res.data.findProducts);
    })
   
  }

  const onChangePriceRange = (priceId) => {
    axios.get(`/api/products/productsByPriceRange/get/${priceId}`).then(res => {
      setProducts(res.data.findProducts);
})

  } 

    
  const fetchPriceRanges = async() => {
    await axios.get('/api/categories/price-ranges').then(res => {
        setPrices(res.data.range);
    })
}   
  return (
    <div style = {{marginTop: '97px', paddingLeft: '0px'}}>
      <div className = 'ml-4'>
         {
          products.slice(0, 1).map(prod => {
            
            return(
              <>
              <h6>{prod.category.name} <span className = 'text-muted'>- {products.length} items</span></h6> 

              </>
            )
          })
        }
       <Breadcrumb separator=">">
        <Breadcrumb.Item href = '/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item>products</Breadcrumb.Item>
      </Breadcrumb>
      </div>
       <div className = 'row' style = {{marginTop: '80px'}}>
       <div className = 'col-md-4 col-lg-3 pl-5 pt-4 border'>
       <h4>Categories</h4>
         {
           categories.map(cat => {
               return(
                 <>
                   {
                     cat.children.map(subCat => {
                       return(
                         <>
                          {
                            subCat.children.slice(0, 3).map(childCat => {
                              return(
                                <div className = 'mb-2 pl-4'>
                                <Checkbox onChange ={(e) => {onChangeCatBox(childCat._id)}}>{childCat.name}</Checkbox>
                                </div>

                              )
                            })
                          }
                         </>
                        

                       )
                     })
                   }
                 </>
               )
           })
         }
          <div>
          
            {
              count ? null : <Link type="primary" onClick={showModal}>
            See More +
          </Link>

            }
            
            
        
          <Modal width = {1000} title="Categories" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <div className = 'row'>
               {
           categories.map(cat => {
               return(
                 <>
                   {
                     cat.children.map(subCat => {
                       return(
                         <>
                          {
                            subCat.children.slice(3, 100000).map(childCat => {
                              return(
                                <div className = 'col-md-3 mt-2'>
                                <Checkbox onChange ={(e) => {onChangeCatBox(childCat._id)}}>{childCat.name}</Checkbox>
                                </div>

                              )
                            })
                          }
                         </>
                        

                       )
                     })
                   }
                 </>
               )
           })
         }
               
               </div>
          </Modal>
           
            </div> 
            
          <div>
          
            </div> 
        <p style = {{borderTop: '.1rem solid gray', paddingLeft: '0px', marginLeft: '0px', marginTop: '8px'}}></p>
         <div className = 'mt-4'>
         <h4>Brands</h4>
           {
             brands.map(brand => {
               return(
                 <div className = 'mb-2 pl-4'>
                 <Checkbox onChange ={(e) => {onChangeBrandBox(brand._id)}}>{brand.name}
                  
                 </Checkbox>
                  </div>
               )
             })
           }
         </div>

         <p style = {{borderTop: '.1rem solid gray', paddingLeft: '0px', marginLeft: '0px', marginTop: '8px'}}></p>
         <div className = 'mt-4'>
         <h4>Price Range</h4>
         {
             prices.map(price => {
               return(
                 <div className = 'mb-2 pl-4'>
                 <Checkbox onChange ={(e) => {onChangePriceRange(price._id)}}>
                      {price.priceRange}
                 </Checkbox>
                  </div>
               )
             })
           }
         </div>

        </div>

       <div className = 'col-md-8 col-lg-9'>
       <div className = 'row'>
       {
         products.map(product => {
              return(
               <div className = 'col-md-4 col-lg-3' style = {{width: '243px'}}>
               <Link to = {'/product/' + product._id}>
               <div className="card border-0">
              <Carousel autoplay>
                {
                  product.productPictures.map(images => {
                    
                    return(
                      <div>
                       
                        <img src = {images.img} className = 'img-responsive img-fluid' style = {{height: '290px'}}  alt = {product.title}/>
                      </div>
                    )
                  })
                }
            </Carousel>
            <div class="card-body pt-0">
                  <div>
                  <h6 class="card-title">{product.title}</h6>
                  <p class="card-title">{product.subTitle}</p>
                  <h6 class="card-title">Rs. {product.price}</h6>
                  </div>
                
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              </Link>

               </div>           
             
           )
         })
       }
       </div>
       </div>
       </div>
  </div>
  )
}
