import React from 'react'
import { AdminSideBar } from './adminSideBar'

export const Layout = (props) => {
    return (
        <div>
           {
               props.sidebar ? 
               <div className = 'row'>
              <div className = 'col-md-3'>
                <AdminSideBar/>
              </div>
              <div className = 'col-md-9 bg-light pr-5 mt-4'>
                {props.children}
              </div>

            </div>
            :
            props.children
           }
            
        </div>
    )
}
