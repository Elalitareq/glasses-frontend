import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Loading from "../../components/loading/loading";

import { Delete } from "../../components/delete/delete";
import { PaginationNav1Presentation } from "../../components/pagination/pagination";
import { AddAdmin } from "../../components/formAdmin/add";
import { EditAdmin } from "../../components/formAdmin/edit";

const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user`);
        const data = await response.json()
        setAdmin(data.message.docs);
        setPageCount(data.message.totalPages);
        setLoading(false);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleAddAdmin = (admin) => {

    setAdmin((prevRows) => [...prevRows, admin]);
  };

  const updateRow = (updatedRow) => {
    setAdmin((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row._id === updatedRow._id) {
          return updatedRow;
        }
        return row;
      });
      return updatedRows;
    });
  };
 
  return (
    <>
       <section className="title">
        <h1>Admin</h1>
    <AddAdmin onAddAdmin={handleAddAdmin}/>
      </section>
      <div className="flex gap-4 flex-row flex-wrap">
        {loading ? (
          <Loading />
        ) : admin ? (
          admin.map((data) => (
            <Card
              key={data._id}
              className="mt-6 w-96 relative rounded bg-[#e9f7fa]"
            >
              <div className="absolute top-4 right-4 text-xl text-red-400 hover:text-red-500 transition-all duration-300">
                <Delete setRows={setAdmin} url="user" id={data._id} />
                <EditAdmin  id={data._id} updateRow={updateRow}/>
              </div>

              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 uppercase tracking-wider"
                >
                  Name: {data.name}
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 uppercase tracking-wider"
                >
                  Username: {data.email}
                </Typography>
              </CardBody>
            </Card>
          ))
        ) : (
          <h2 className="w-full text-center">No Admin Found</h2>
        )}
      </div>
      <PaginationNav1Presentation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageCount={pageCount}
      />
    </>
  );
};
export default Admin;
