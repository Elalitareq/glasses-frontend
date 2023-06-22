import { useParams } from "react-router-dom";
import { AddProduct } from "../../components/formProduct/add";
import React, { useEffect, useState } from "react";
import { Delete } from "../../components/delete/delete";
import Papa from "papaparse";
import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import ReusableTable from "../../components/reusableTable";
import { EditProduct } from "../../components/formProduct/edit";
import { toast } from "react-hot-toast";

const Product = () => {
  const [openCsv, setOpenCsv] = useState(false);
  const [quantity,setQuantity] = useState([]);
  const [openQuantityCsv, setOpenQuantityCsv] = useState(false);
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get("type");
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/productInfo/${id}?page=${page}`
        );
        const data = await response.json();
        setRows(data.message.docs);
        setPageCount(data.message.totalPages);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage, id]);
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
  const uploadData = async(e)=>{
    const response = await fetch(
      `${process.env.REACT_APP_URL}/productInfo/many`,{
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({dataArray:data,product:id})
      }
    )
    const res=await response.json()
    toast.success("files successfully uploaded")
    setOpenCsv(false)
  }
  const handleUpdateQuantity = async(e)=>{
    const response = await fetch(
      `${process.env.REACT_APP_URL}/productInfo/many`,{
        headers: {
          "Content-Type": "application/json",
        },
        method: 'PATCH',
        body: JSON.stringify({quantity,product:id})
      }
    )
    const res=await response.json()
    console.log(res)
    toast.success("files successfully uploaded")
    setOpenCsv(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const dataArray = [];
        results.data.forEach((oneData)=>{

          const powerValue = oneData.power;
          delete oneData.power;
          
          for (const key in oneData) {
            const barcode = oneData[key];
            const power =
              parseFloat(key) > 0
                ? `${powerValue}-${key}`
                : `${powerValue}`;
  
                dataArray.push({ power, barcode });
              }
        })
        setData(dataArray)
        
        // console.log(results.data);
      },
    });
  };
  const handleQuantityAndPriceUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log(results.data)
        setQuantity(results.data)

      },
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
            <Delete
              title="Product"
              url="productInfo"
              id={params.row._id}
              setRows={setRows}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <section className="title ">
        <h1>{type}</h1>
        <button className="rounded bg-green-400 text-white px-4 py-3 hover:bg-green-600  transition-colors duration-300" onClick={e=>setOpenQuantityCsv(true)}> Upload Quantity File</button>
        <button className="rounded bg-green-400 text-white px-4 py-3 hover:bg-green-600  transition-colors duration-300" onClick={e=>setOpenCsv(true)}> Upload Barcode File</button>
        

        <AddProduct product={id} onAddProduct={handleAddProduct} />
      </section>
      <ReusableTable columns={columns} rows={rows} />
      <PaginationNav1Presentation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageCount={pageCount}
      />
      
      {openQuantityCsv&&<div className="fixed h-full w-full left-0 top-0 flex justify-center items-center bg-[#000000dd] z-50">
        <button className="font-extrabold text-3xl  text-red-500 hover:text-red-700 transition-colors duration-300 right-10 top-10 absolute" onClick={e=>setOpenQuantityCsv(false)}>X</button>
        <div className="w-full h-full ">
          <div className="w-full flex justify-center py-5 text-white">

        <input type="file" onChange={handleQuantityAndPriceUpload} className="mx-auto "/>
          </div>
        <div className="w-3/4 h-[700px] overflow-y-scroll mx-auto bg-white flex flex-row flex-wrap px-10  py-4">

        {quantity.map((oneData, index) => (
          <div key={index} className="  border border-black px-6 py-3  w-1/4">
            {oneData.power} : {oneData.quantity}:{oneData.price}
          </div>
        ))}
        </div>
        <div className="flex justify-center py-4">

        <button className="rounded bg-green-400 text-white px-4 py-3 hover:bg-green-600  transition-colors duration-300 mx-auto" onClick={handleUpdateQuantity}>Upload Products</button>
        </div>
        </div>

      </div>}
      {openCsv&&<div className="fixed h-full w-full left-0 top-0 flex justify-center items-center bg-[#000000dd] z-50">
        <button className="font-extrabold text-3xl  text-red-500 hover:text-red-700 transition-colors duration-300 right-10 top-10 absolute" onClick={e=>setOpenCsv(false)}>X</button>
        <div className="w-full h-full ">
          <div className="w-full flex justify-center py-5 text-white">

        <input type="file" onChange={handleFileUpload} className="mx-auto "/>
          </div>
        <div className="w-3/4 h-[700px] overflow-y-scroll mx-auto bg-white flex flex-row flex-wrap px-10  py-4">

        {data.map((oneData, index) => (
          <div key={index} className="  border border-black px-6 py-3  w-1/4">
            {oneData.power} : {oneData.barcode}
          </div>
        ))}
        </div>
        <div className="flex justify-center py-4">

        <button className="rounded bg-green-400 text-white px-4 py-3 hover:bg-green-600  transition-colors duration-300 mx-auto" onClick={uploadData}>Upload Products</button>
        </div>
        </div>

      </div>}
    </div>
  );
};

export default Product;
