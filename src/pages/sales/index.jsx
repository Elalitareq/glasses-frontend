




import { useParams } from "react-router-dom";
import { AddSale } from '../../components/formSale/add'
import React, { useEffect, useState } from "react";
import { Delete } from "../../components/delete/delete";

import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import ReusableTable from "../../components/reusableTable";


const SalesPage = () => {
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
          `${process.env.REACT_APP_URL}/sale?page=${page}`
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


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddProduct = (product) => {

    setRows((prevRows) => [...prevRows, product]);
  };

  const columns = [
    { accessor: "created_at", header: "Created At" },
    { accessor: "customer.address", header: "Address" },
    { accessor: "customer.company_name", header: "Company Name" },
    { accessor: "customer.email", header: "Email" },
    { accessor: "discount", header: "Discount" },
    {
      accessor: "products.product",
      header: "Products",
      renderCell: (params) => {
        console.log(params.row)
        const products = params.row.products;
        const productNames = products.map((product) => product.product.power).join(", ");
        return <span>{productNames}</span>;
      },
    },
  
    {
      accessor: "Action",
      header: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
            <Delete title="Product" url="productInfo" id={params.row._id} setRows={setRows} />
          </div>
        );
      },
    },
  ];
  
  return(<div>
     <section className="title ">
  <h1>Sales</h1>
  <AddSale product={id} onAddProduct={handleAddProduct}/>
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


export default SalesPage
