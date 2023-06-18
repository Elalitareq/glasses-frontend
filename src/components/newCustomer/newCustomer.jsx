import {
    Card,
    CardHeader,
    CardBody,
    Typography,

  } from "@material-tailwind/react";
  import { CheckIcon } from "@heroicons/react/24/outline";
  import { useEffect, useState } from "react";
  
  export default function NewProduct() {
    const [customer,setCustomer]=useState([])
      useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_URL}/customer/last`
              );
              const data = await response.json();
              setCustomer(data.message);
            } catch (error) {
              console.log("Error sending data:", error);
            }
          };
          fetchData();
        }, []);
    return (
      <Card
        variant="gradient"
        className="bg-gray-700 w-[500px] max-w-[500px] text-white  p-8"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-3 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-4 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-2xl">New Customer</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            {customer.map((customer)=>(

<li className="flex items-center gap-4">
<span className="rounded-full border border-white/20 bg-white/20 p-1">
  <CheckIcon strokeWidth={2} className="h-3 w-3" />
</span>
<Typography className="font-normal">{customer.company_name} </Typography><span className="text-gray-400">{customer.created_at.split("T")[0]}</span>
</li>
            ))}
           
           
          </ul>
        </CardBody>
      </Card>
    );
  }
  