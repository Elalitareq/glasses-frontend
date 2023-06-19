import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Example({ newType }) {
  const [type, setType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/product`);
        const data = await response.json();
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
    <div className="cardProduct">
      {type.map((data) => (
        <Card key={data._id} className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Type: {data.type}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-gray-700">
              <Link to={`/product/${data._id}?type=${data.type}`}>View</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
