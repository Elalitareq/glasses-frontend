import React, { useEffect, useState } from "react";
import { Delete } from "../../components/delete/delete";
import { AddForm } from "../../components/formCustomer/add";
import { EditForm } from "../../components/formCustomer/edit";
import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import ReusableTable from "../../components/reusableTable";

const CustomersPage = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/customer?page=${page}`
        );
        const data = await response.json();
        setRows(data.message.docs);
        setPageCount(data.message.totalPages);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);
  const updateRow = (updatedRow) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row._id === updatedRow._id) {
          return updatedRow;
        }
        return row;
      });
      return updatedRows;
    });
  };
 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddCustomer = (customer) => {

    setRows((prevRows) => [...prevRows, customer]);
  };

  const columns = [
    { accessor: "company_name", header: "Company Name" },
    { accessor: "phone", header: "Phone" },
    { accessor: "address", header: "Address" },
    { accessor: "email", header: "Email" },
    {
      accessor: "Action",
      header: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
           <EditForm id={params.row._id} updateRow={updateRow} />
            <Delete title="Customer" url="customer" id={params.row._id}  
          setRows={setRows}/>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <section className="title">
        <h1>Customer</h1>
        <AddForm onAddCustomer={handleAddCustomer} />
      </section>
      <ReusableTable columns={columns} rows={rows} />
      <PaginationNav1Presentation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageCount={pageCount}
      />
    </div>
  );
};

export default CustomersPage;
