import React, { useState } from 'react'
import Sidebar from '../sidebar'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'

const Layout = ({children}) => {
  const [open,setOpen]=useState(false)
  return (
    <>
    <button onClick={e=>setOpen(!open)}><FiChevronRight className={`text-4xl fixed left-4 top-4 z-50 ${open?" rotate-180":""}`}/></button>

    <Sidebar open={open}/>
    <main className={`${open?"left-[17rem]":"left-4"} bottom-4 right-4 top-4 fixed overflow-y-scroll border border-[#3e818b] rounded-lg shadow-lg px-4 bg-[#3e818b] transition-all duration-500`}>{children}</main>
    {/* <footer>footer</footer> */}
    </>
  )
}

export default Layout