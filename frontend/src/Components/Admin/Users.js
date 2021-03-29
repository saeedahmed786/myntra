import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { Drawer, Col, Row, Spin } from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined, LoadingOutlined} from '@ant-design/icons';
import { Form, Input, Select, Checkbox, Button, AutoComplete, DatePicker } from 'antd';
import moment from 'moment';
import swal from 'sweetalert';


const { Option } = Select;

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [productId, setProductId] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [member, setMember] = useState({});
    const [form] = Form.useForm();
    const [DOB, setDOB] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState('');
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        role: '',
        city: '',
        country: '',
    });
    const{ firstName, lastName, email, username, phone, role, city, country} = user;

    
    const handleEditUserChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }
    const handleImageChange = (e) => { 
        setFile(
          e.target.files[0]
    
        )
      }

      const removeImage = () => {
        setImage('');
      }
      const onDobChange = (dateString) => {
        setDOB(dateString);
      }

    const showDrawer = () => {
        setVisible(true);
      };
    
     const onClose = () => {
        setVisible(false);
      };
      const showEditDrawer = () => {
        setEditVisible(true);
      };
    
     const onEditClose = () => {
        setEditVisible(false);
      };
    
      const DescriptionItem = ({ title, content }) => (
        <div className="site-description-item-profile-wrapper">
          <p className="site-description-item-profile-p-label" style = {{marginBottom: '0px', fontWeight: 'bolder', marginTop: '19px'}}>{title}:</p>
          {content}
        </div>
      );


      const getToken = () => {
        setToken(localStorage.getItem('token'));
      }

    useEffect(() => {

        getUsers();
        getToken();

        return () => {
            
        }
    }, [])

    const getUsers = async() => {
        setLoading(true);
        await axios.get('/api/users/get').then(res => {
            setUsers(res.data);
            setLoading(false);
        })
    }

    const getUserById = async(userId) => {
        setLoading(true);
        await axios.get(`/api/users/get/${userId}`).then(res => {
            setUser(res.data);
            setDOB(res.data.DOB);
            setProductId(res.data._id)
            setImage(res.data.userPicture)
            setLoading(false);
        })
    }
/*****************************************Submit Handler ***************************************************/
    const handleSubmit = async() => {
        setLoading(true);
        let data = new FormData();
        data.append('firstName', user.firstName);
        data.append('lastName', user.lastName);
        data.append('email', user.email);
        data.append('username', user.username);
        data.append('phone', user.phone);
        data.append('DOB', DOB);
        data.append('city', user.city);
        data.append('country', user.country);
        data.append('file', file);
        data.append('image', image);
        await axios.post(`/api/users/edit/${productId}`, data, {headers: {'authorization' : 'Bearer ' + token}}).then(res => {
          setLoading(false);
          if(res.status === 200) {
          swal('Congrats!', res.data.successMessage, 'success');
          }
         else if(res.status === 201) {
           swal('Sorry!', res.data.errorMessage, 'warning');
           }
           else if(res.status === 201) {
           }
           else {
             swal('Sorry!', res.data.errorMessage, 'warning');
           }
      })
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 30, color: '##ff3e6c' }} spin />;



    
    return (
        <div>
          <Layout sidebar>
          <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Picture</th>
                <th scope="col">Full Name</th>
                <th scope="col">Username</th>
                <th scope="col">E-mail</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                     users.map((user, index) => {
                         return(
                            <tr>
                            <th className = 'pt-4' scope="row">{index + 1}</th>
                            <td><img width = '60' height = '64'  src = {user.userPicture} alt = {user.firsName}/></td>
                            <td className = 'pt-4'>{user.firstName} {user.lastName}</td>
                            <td className = 'pt-4'>{user.username}</td>
                            <td className = 'pt-4'>{user.email}</td>
                            <td className = 'pt-4'><span className = 'border p-2'>{user.role}</span></td>
                            <td className = 'pt-4'>
                              <a onClick = {() => {getUserById(user._id); showDrawer()}}><EyeOutlined /></a>
                              <a className = 'ml-3' onClick = {() => {getUserById(user._id); showEditDrawer(); setSuccess(true);}}><EditOutlined /></a>
                               
                            </td>
                            </tr>
                         )
                     })
                }
                
            </tbody>
            </table>


{/******************************************* Drawer for User Information *******************************/}

        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <p className="site-description-item-profile-p" style={{ marginTop: '80px', fontWeight: 'bold' }}>
            User Profile
          </p>
          <Row>
            <Col span={12} className = 'text-center'>
               <img width = '200' src = {user.userPicture} alt = {user.firstName}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content={<span>{user.firstName}  {user.lastName}</span>} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="E-mail" content={user.email} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Username" content={user.username} />
            </Col>
          <Col span={12}>
              <DescriptionItem title="Phone" content={user.phone} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="City" content={user.city} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content={user.country} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Birthday" content={user.DOB} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Role" content={user.role} />
            </Col>
          </Row>
        </Drawer>


{/******************************************* Drawer for Editing User Information *******************************/}
        {
          loading ?
          <div className = 'text-center fixed-top' style = {{marginTop: '50vh'}}>
          <Spin indicator={antIcon} />
          </div>

          :

        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onEditClose}
          visible={editVisible}
        >
            <Form className = 'editUserForm'>
            <Row>
            <Col span={24} style = {{paddingLeft: '23px', marginTop: '100px', marginBottom : '32px'}}>
              {
                image &&
                <>
                <div>
              <DeleteOutlined onClick = {() => removeImage()} style = {{paddingLeft: '180px'}}/>
              </div>
              <img src = {image} width = '180' height = '200'/>
              </>
              }
             {
               !image && 
               <div className="custom-file" style = {{marginLeft: '120px'}}>
              <input type="file" name = 'file' required multiple onChange = {handleImageChange}/>
              <label className="custom-file-label" for="customFile"></label>
              </div>
             }
              
              
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
             <h6>First Name:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'firstName' onChange= {handleEditUserChange} value={user.firstName}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Last Name:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'lastName' onChange= {handleEditUserChange} value={user.lastName}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Email:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'email' onChange= {handleEditUserChange} value={user.email}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Role:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'role' onChange= {handleEditUserChange} value={user.role}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Username:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'username' onChange= {handleEditUserChange} value={user.username}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Phone:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'phone' onChange= {handleEditUserChange} value={user.phone}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>City:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'city' onChange= {handleEditUserChange} value={user.city}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Country:</h6>
            <Input style = {{marginBottom: '32px'}} name = 'country' onChange= {handleEditUserChange} value={user.country}/>
            </Col>
            <Col span={12} style = {{paddingLeft: '23px'}}>
            <h6>Date of Birth:</h6>
            <DatePicker style = {{width: '269px'}} value = {moment(DOB)} onChange={onDobChange} />
            </Col>
            <Col className = 'text-center' span={24} style = {{paddingLeft: '23px', marginTop: '32px'}}>
            <Button onClick = {handleSubmit} type = 'primary'>Submit</Button>
            </Col>
            </Row>
         
            </Form>
            

       </Drawer>
       }
          </Layout>
            
        </div>
    )
}
