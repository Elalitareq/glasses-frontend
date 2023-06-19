import React from "react";
import NewProduct from "../../components/newCustomer/newCustomer";
import NewSupplier from "../../components/newSupplier/newSupplier";
import NotStocked from "../../components/notStockedCard/noStocked";

const Dashboard = () => {
  return (
    <div>
      {" "}
      <section className="title">
        <h1>Dashboard</h1>
      </section>
      <section className="grid grid-cols-3 gap-4">
        <NotStocked />
        <NewProduct />

        <NewSupplier />
      </section>
    </div>
  );
};

export default Dashboard;
