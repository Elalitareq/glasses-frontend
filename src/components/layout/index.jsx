import React from 'react'
import Sidebar from '../sidebar'

const Layout = ({children}) => {
  return (
    <>
    <Sidebar/>
    <main className='ml-64 px-4 py-4 max-h-screen overflow-y-scroll'>{children}</main>
    <footer>footer</footer>
    </>
  )
}

export default Layout