import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Delete } from "../delete/delete";
import Loading from "../loading/loading";

export default function Example({ newType }) {
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/product`);
        const data = await response.json();
        setLoading(false);
        setType(data.message.docs);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (newType && Object.keys(newType).length > 0) {
      setType((prevType) => [...prevType, newType]);
    }
  }, [newType]);

  return (
    <div className="flex gap-4 flex-row flex-wrap">
      {loading ? (
        <Loading />
      ) : type.length > 0 ? (
        type.map((data) => (
          <Card key={data._id} className="mt-6 w-96 relative rounded bg-[#e9f7fa]">
            <div className="absolute top-4 right-4 text-xl text-red-400 hover:text-red-500 transition-all duration-300">
              <Delete setRows={setType} url="product" id={data._id} />
            </div>

            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2 uppercase tracking-wider">
                {data.type}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-between w-full">
           
                <Link to={`/product/${data._id}?type=${data.type}`}   className="bg-[#3e818b] px-3 py-2 inline-block rounded text-white" >View</Link>
              
            </CardFooter>
          </Card>
        ))
      ) : (
        <h2 className="w-full text-center">No Product Types Found</h2>
      )}
    </div>
  );
}
