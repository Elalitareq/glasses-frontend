import React, { useEffect, useState } from 'react'
import { useSignOut } from 'react-auth-kit'
import { useLocation, Link } from 'react-router-dom'

const routes = [
  { to: "/", label: "Dashboard" },
  { to: "/customers", label: "Customers" },
  { to: "/products", label: "Products" },
  { to: "/sales", label: "Sales" },
  // { to: "/suppliers", label: "Suppliers" },
]

const Sidebar = ({open}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const logout = useSignOut()

  useEffect(() => {
    if (isLoggingOut) {
      logout()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingOut,open])

  return (
    <div className={`fixed top-4 bottom-4 h-[calc(100vh-2rem)] w-60 bg-[#3e818b] transition-all duration-500 rounded-lg flex text-gray-700 flex-col px-4 py-4 shadow-lg ${open?"left-4":"-left-full"}`}>
      <div className='w-full border-b mb-5 border-gray-500 min-h-[150px]'></div>
      {routes.map(route => (
        <Link
          key={route.to}
          to={route.to}
          className={`w-full py-3 my-2 font-semibold rounded pl-4 transition-colors duration-300 hover:bg-[#2d5d64] hover:text-white ${
            location.pathname === route.to ? 'bg-white text-black' : ' text-white'
          } `}
        >
          {route.label}
        </Link>
      ))}
      <button
        className='w-[calc(100%-2rem)] py-3 my-2 font-semibold text-center absolute bottom-4 text-white rounded-lg px-4 bg-red-400 hover:bg-red-500  transition-colors duration-300'
        onClick={e => setIsLoggingOut(true)}
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar
