import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { Modal, Select, TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import swal from 'sweetalert';
import ReactQuill from 'react-quill';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { EditProduct } from './editProduct'
import { CreateProducts } from './CreateProducts'



const { Option } = Select;
const { TreeNode } = TreeSelect;

const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

export const GetProducts = () => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();
    const [success, setSuccess] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [cat, setCat] = useState('');

       


/************************************************** Fetch Products ***********************************************/   
    const fetchProducts = async () => {
        const response = await axios.get('/api/products/get').then(res => {
            setProducts(res.data.products);
        });
    }

    useEffect(() => {
        fetchProducts();
        return () => {
            
        }
    }, [success]);
 

 /************************************************** Get Product ***********************************************/   
  const editHandler = (productId) => {
    axios.get(`/api/products/${productId}`).then(res => {
      setProduct(res.data.findProduct);
    })

}

   
     
/************************************************** Modal ***********************************************/   
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

 

 /************************************************** Delete Products ***********************************************/   
  const deleteHandler = (productId) => {
      console.log(productId)
      axios.delete(`/api/products/delete/${productId}`).then(res => {
          if(res.status === 200){
              setSuccess(true);
          swal('Success', res.data.successMessage, 'success'); 
          setSuccess(false);
        } else {
            swal('Error', 'Error in deleting product', 'error');
        }
      })

  }


/****************************************** Get Categories & Brands *******************************************/    
            const fetchCategories =  () => {
                axios.get('/api/categories').then(data => {
                setCategories(data.data);
            })
            }

            const fetchBrands = () => {
                axios.get('/api/categories/brands').then(data => {
                setBrands(data.data.brands);
            })
            }


            useEffect(() => {

            fetchCategories();
            fetchBrands();
            return () => {
            }
            }, [isModalVisible]);



    return (
        <div>
          <Layout sidebar>
              <h1 className = 'text-center'>Products</h1>
              <span className = 'float-right my-2'>
              <CreateProducts/>
            </span>
              <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Sub-title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Action</th>
                    
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(prod => {
                        return(
                            <tr key = {prod._id}>
                            <th scope="row">
                            <a onClick = {() => {editHandler(prod._id); showModal()}}>
                            {prod.title}
                            </a>
                           
                            </th>
                            <td>{prod.subTitle}</td>
                            <td>Rs.{prod.price}</td>
                            <td>
                            {prod.category.name}
                            </td>
                            <td>{prod.brand.name}</td>
                            <Link className='btn' style={{ textDecoration: 'none' }} to ={'/admin/product/edit/' + prod._id}><i className="fa fa-edit"></i></Link>  &nbsp;
                            <button className='btn'><i className="fa fa-trash-alt" onClick = {() => deleteHandler(prod._id)}></i></button>
                  
                            </tr>

                        )
                    })
                }
              
                </tbody>
                </table>
                
                 {
                     product ? 
                <Modal width = {800} title="Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <div className="row">
                                <div className="col-md-6 my-4">
                                <h6>Product Title :</h6>
                                    <b>{product.title} </b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Product Sub-Title :</h6>
                                     <b>{product.subTitle} </b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Product Brand :</h6>
                                     <b>{product.brand.name} </b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Product Category :</h6>
                                     <b>{product.category.name} </b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Product Price :</h6>
                                     <b>RS. {product.price} </b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Price Range :</h6>
                                     <b>{product.priceRange.priceRange} </b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Product Offer :</h6>
                                     <b>(Rs.{product.offPrice}) {product.offer}%Off</b>
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Product Sizes :</h6>
                                {
                                    product.productSizes.map(size => {
                                        return(
                                            <b className = 'mr-3'>{size.size}</b>
                                        )
                                    })
                                }
                                </div>
                                <div className="col-md-6 my-4">
                                <h6>Colors Available :</h6>
                                {
                                    product.productColors.map(color => {
                                        return(
                                            <b className = 'mr-2'>{color.color}</b>
                                        )
                                    })
                                }
                                </div>
                                <div className="col-md-12 my-4">
                                <h6>Product Description :</h6>
                            <p>    { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} /> }</p>

                                </div>

                                <div className="col-md-6 my-4">
                                <h6> Product Pictures :</h6>
                                {
                                    product.productPictures.map(pic => {
                                        return(
                                        <img width = '100' height = '100' className = 'mr-4 mt-3' src = {pic.img} alt = 'product'/>
                                        )
                                    })
                                }
                                </div>



                               
                            </div>
                            </Modal>

                            :
                            null

                 }

          </Layout>
            
        </div>
    )
}
