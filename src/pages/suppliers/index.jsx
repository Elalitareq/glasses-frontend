import React, { useEffect, useState } from "react";
import { Delete } from "../../components/delete/delete";
import { AddSupplier } from '../../components/formSupplier/add'
import { EditSupplier } from '../../components/formSupplier/edit'
import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import ReusableTable from "../../components/reusableTable";

const SupliersPage = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/supplier?page=${page}`
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

  const handleAddCustomer = (supplier) => {

    setRows((prevRows) => [...prevRows, supplier]);
  };

  const columns = [
    { accessor: "name", header: "Name" },
    { accessor: "description", header: "Description" },
  
    {
      accessor: "Action",
      header: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
           <EditSupplier id={params.row._id} updateRow={updateRow} />
            <Delete title="Supplier" url="supplier" id={params.row._id}  
          setRows={setRows}/>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <section className="title">
        <h1>Supplier</h1>
        <AddSupplier onAddSupplier={handleAddCustomer} />
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

export default SupliersPage
