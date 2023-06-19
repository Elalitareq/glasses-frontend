import { useParams } from "react-router-dom";
import { AddProduct } from "../../components/formProduct/add";
import React, { useEffect, useState } from "react";
import { Delete } from "../../components/delete/delete";

import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import ReusableTable from "../../components/reusableTable";
import { EditProduct } from "../../components/formProduct/edit";

const Product = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get("type");
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/productInfo/${id}?page=${page}`
        );
        const data = await response.json();
        setRows(data.message.docs);
        console.log(data.message)
        setPageCount(data.message.totalPages);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage,id]);
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

  const handleAddProduct = (product) => {

    setRows((prevRows) => [...prevRows, product]);
  };

  const columns = [
    { accessor: "bar_code", header: "Barcode" },
    { accessor: "power", header: "Power" },
    { accessor: "quantity", header: "Quantity" },
    { accessor: "buying_price", header: " Buying price" },
    { accessor: "selling_price", header: "Selling price" },
    {
        accessor: "isStocked",
        header: "Stocked",
        renderCell: (params) => {
            const isStocked = Boolean(params.row.isStocked);
            console.log("isStocked:", isStocked); // Add this line
            return (
              <div style={{ display: "flex" }}>
                {isStocked ? (
                  <span>&#10003;</span> // Checkmark symbol
                ) : (
                  <span>X</span>
                )}
              </div>
            );
          },
          
      },
      
    {
      accessor: "Action",
      header: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
           <EditProduct id={params.row._id} updateRow={updateRow} />
            <Delete title="Product" url="productInfo" id={params.row._id}  
          setRows={setRows}/>
          </div>
        );
      },
    },
 
  ];
  return(<div>
     <section className="title ">
  <h1>{type}</h1>
  <AddProduct product={id} onAddProduct={handleAddProduct}/>
</section>
 <ReusableTable columns={columns} rows={rows} />
 <PaginationNav1Presentation
   currentPage={currentPage}
   handlePageChange={handlePageChange}
   pageCount={pageCount}
 />
 </div>
) 
  
  ;
};

export default Product;
