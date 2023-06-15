import React from 'react'

const Layout = ({children}) => {
  return (
    <>
    <header>header</header>
    <main>{children}</main>
    <footer>footer</footer>
    </>
  )
}

export default Layout