import React, { useState } from 'react'
import { AddType } from '../../components/addType/add'
import Example from '../../components/card/card'



const ProductsPage = () => {
  const [type,setType]=useState()
  const handleAddData=(type)=>{
    setType(type)
  }
  return (
    <>
    <section className="title">
    <h1>Product</h1>
    <AddType onAddProduct={handleAddData}/>
  </section>
    <Example newType={type}/>
    </>
  )
}

export default ProductsPage