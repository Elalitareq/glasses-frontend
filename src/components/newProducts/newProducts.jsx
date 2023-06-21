import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { CheckIcon } from "@heroicons/react/24/outline";
  import Loading from "../loading/loading";
  
  export default function NewProduct(product) {
  
    return (
      <Card
        variant="gradient"
        className="bg-[#3e818b]  text-white w-full max-w-[500px] p-8  rounded-lg"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-3 rounded-none border-b border-white/10 pb-3 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-2xl">New Product</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          {!product ? (
            <Loading />
          ) : (
            <ul className="flex flex-col gap-4">
              {product.product &&
                product.product.map((supplier, i) => (
                  <li className="flex items-center gap-4" key={i}>
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      <CheckIcon strokeWidth={2} className="h-3 w-3" />
                    </span>
                    <Typography className="font-normal">
                      {supplier.bar_code}{" "} {supplier.power}
                    </Typography>
                    <span className="text-gray-400">
                      {supplier.created_at.split("T")[0]}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </CardBody>
      </Card>
    );
  }
  