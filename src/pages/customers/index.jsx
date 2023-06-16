import React from 'react'
import { Delete } from '../../components/delete/delete'
import { AddForm } from '../../components/formCustomer/add'
import { EditForm } from '../../components/formCustomer/edit'

const CustomersPage = () => {
  return (
    
    <div>
    
      <AddForm/>
      <EditForm/>
      <Delete title="customer" url="customer" id="648b0eb2b9fb8794abf9d5fd"/>
      </div>
  )
}

export default CustomersPage