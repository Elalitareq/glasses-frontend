
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../../components/loading/loading";

import NewCustomer from "../../components/newCustomer/newCustomer";
import NewProduct from "../../components/newProducts/newProducts";
import NewSupplier from "../../components/newSupplier/newSupplier";
import NotStocked from "../../components/notStockedCard/noStocked";

const Dashboard = () => {
  const [last,setLast]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/sale/All`
        );
        const data = await response.json();
   
        setLast(data.messages);
        setLoading(false)
       
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };
    fetchData();
  }, []);
  if(loading){return(<Loading/>)}else{
  return (
    <div>
      {" "}
      <section className="title">
        <h1>Dashboard</h1>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-4  gap-4">
        {last?(<> <NotStocked stocked={last[0]}/>
        <NewCustomer customer={last[3]}/>

        {/* <NewSupplier supplier={last[4]}/> */}
      <NewProduct product={last[1]}/></>):(<Loading/>)}
        
      </section>
    </div>
  );}
};

export default Dashboard;
