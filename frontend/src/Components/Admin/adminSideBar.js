import React from 'react'
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import Sider from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';

export const AdminSideBar = () => {
      
    return (
        <div>
            <Sider
                style={{  
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0
                }}
                >
                <h2 className = 'text-white pl-3'>Dashboard</h2>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="7">
                    <Link to = '/admin/users'>Users </Link>
                </Menu.Item>
                <SubMenu key="sub1" title="Categories/Sub-Categories">
                <Menu.Item key="3"><Link to = '/admin/all-categories'>List of Categories</Link></Menu.Item>
                <Menu.Item key="brand"><Link to = '/admin/all-brands'>List of Brands</Link></Menu.Item>
                <Menu.Item key="price-range"><Link to = '/admin/all-price-range'>Price Ranges</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="1">
                   <Link to = '/admin/get-products'>Products</Link>
                </Menu.Item>
                <Menu.Item key="6">
                   <Link to = '/admin/coupans'>Coupans</Link>
                </Menu.Item>
                <Menu.Item key="5">
                   <Link to = '/admin/orders'> Order Management</Link>
                </Menu.Item>
                </Menu>
                </Sider>
               
            
        </div>
    )
}
