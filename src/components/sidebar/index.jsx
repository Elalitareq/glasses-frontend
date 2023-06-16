import React from 'react'
import { Link } from 'react-router-dom'
const routes =[
  {to:"/", label:"Dashboard"},
  {to:"/customers", label:"Customers"},
  {to:"/products", label:"Products"},
  {to:"/sales", label:"Sales"},
  {to:"/suppliers", label:"Suppliers"},
]

const Sidebar = () => {
  return (
    <div className='fixed left-4 top-4 bottom-4 h-[calc(100vh-2rem)]  w-60 bg-gray-700 rounded-2xl flex text-gray-700 flex-col px-4 py-4'>
      {routes.map(route => {
        return  <Link key={route.to} to={route.to} className='w-full py-3 my-2 font-semibold  bg-white rounded-xl pl-4'>{route.label}</Link>
      })}

      {/* <Link to="/users" className='w-full py-3 bg-white rounded pl-4'>Dashboard</Link> */}
 

    
    </div>
  )
}

export default Sidebar