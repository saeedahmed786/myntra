import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { isAuthenticated, setAuthentication } from './auth';
import { getUserData } from './localStorage';
import { Link } from 'react-router-dom';

export const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinish = async (values) => {
    window.scrollTo(0, 0);
    setLoading(true);
    let data = new FormData();
    data.append('email', values.email);
    data.append('password', values.password);
     
     await axios.post('/api/users/login', data).then(res => {
         setLoading(false);
         if(res.status === 200) {
         setAuthentication(res.data, res.data.token);    
         swal('Congrats!', res.data.successMessage, 'success');
         props.history.push('/');
         window.location.reload();
         }
        else if(res.status === 201) {
          swal('Sorry!', res.data.errorMessage, 'error');
          }
          else {
            swal('Sorry!', res.data.errorMessage, 'warning');
          }
     })

  };


  const antIcon = <LoadingOutlined style={{ fontSize: 30, color: '##ff3e6c' }} spin />;

  return (
      loading 
      ?
      <div className = 'text-center fixed-top' style = {{marginTop: '50vh'}}>
      <Spin indicator={antIcon} />
      </div>

      :

      <div className = 'login' style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '200px'}}>
        <div>
        <h2 className = 'text-center ml-5 mb-5'>Login your Account</h2>
    <Form
      {...formItemLayout}
      form={form}
      name="login"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail or Username"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail or Username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
      <div className = 'mt-4' style = {{marginLeft: '160px'}}>
          <p>
              New to Myntra? <Link to = '/signup'>Register</Link>
          </p>
      </div>
    </div>
    </div>  
  );
};
