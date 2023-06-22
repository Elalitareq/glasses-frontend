import React from 'react'
import Sidebar from '../sidebar'

const Layout = ({children}) => {
  return (
    <>
    <Sidebar/>
    <main className='left-[17rem] bottom-4 right-4 top-4 fixed overflow-y-scroll border border-[#3e818b] rounded-lg shadow-lg px-4 bg-[#a4c1c9]'>{children}</main>
    {/* <footer>footer</footer> */}
    </>
  )
}

export default Layout