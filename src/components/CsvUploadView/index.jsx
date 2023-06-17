import { useState } from "react";
import ReusableTable from "../reusableTable";
import CSVReader from "react-csv-reader";

const CsvView = () => {
    const [openCsvUpload,setOpenCsvUpload] =useState(false)
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
  
    const handleFileUpload = (data, fileInfo) => {
      const csvColumns = data[0].map((column, index) => ({
        header: column,
        accessor: index.toString(),
      }));
  
      const csvRows = data.slice(1).map((row) => {
        const rowData = {};
        row.forEach((cell, index) => {
          rowData[index.toString()] = cell;
        });
        return rowData;
      });
  
      setColumns(csvColumns);
      setRows(csvRows);
    };
  
    const handleFileError = (error, file, inputElem, reason) => {
      console.error('CSV file parsing error:', error);
    };
    
    return (
        <>
        <button onClick={e=>setOpenCsvUpload(true)}>
            Upload Csv File
        </button>

      {openCsvUpload&&
      <div className="fixed bg-[#00000080] flex justify-center items-centers">

      <div className="container mx-auto p-4 relative bg-white ">
        <button className="text-red font-bold text-2xl absolute right-2 top-2s " onClick={()=>setOpenCsvUpload(false)}>X</button>
        <h1 className="text-2xl font-bold mb-4">User List</h1>
  
        <CSVReader
          onFileLoaded={handleFileUpload}
          onError={handleFileError}
          parserOptions={{ header: true }}
          />
  
        <ReusableTable columns={columns} rows={rows} />
          </div>
      </div>}
        </>
    );
  };
  
  export default CsvView;