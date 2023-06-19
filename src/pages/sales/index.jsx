import { Link, useParams } from "react-router-dom";
import { AddSale } from "../../components/formSale/add";
import React, { useEffect, useState } from "react";
import { CiRead } from "react-icons/ci";

import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import ReusableTable from "../../components/reusableTable";

const SalesPage = () => {
  const { id } = useParams();

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
        console.log(data);
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
    {
      accessor: "products",
      header: "Products",
      renderCell: (params) => {
        return (
          <ul>
            {params.row.products.map((product) => (
              <li key={product._id}>
                barcode:{product.barcode} Quantity:{product.quantity}
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      accessor: "customer",
      header: "Customer",
      renderCell: (params) => {
        return params.row.customer.company_name;
      },
    },

    { accessor: "created_at", header: "Created At" },
    { accessor: "discount", header: "Discount" },

    {
      accessor: "Action",
      header: "Action",
      renderCell: (params) => {
        return (
          <Link to={`/invoice/${params.row._id}`}>
            <CiRead />
          </Link>
        );
      },
    },
  ];

  return (
    <div>
      <section className="title ">
        <h1>Sales</h1>
        <AddSale product={id} onAddProduct={handleAddProduct} />
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

export default SalesPage;
