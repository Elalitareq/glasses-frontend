import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Loading from "../loading/loading";

export default function NotStocked(stocked) {
  return (
    <Card
      variant="gradient"
      className="bg-[#e9f7fa]  text-black w-full max-w-[400px] p-4 rounded-lg"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-3 rounded-none border-b border-white/10 pb-3 text-center "
      >
        <Typography
          variant="h1"
          color="white"
          className=" flex justify-center gap-1 text-7xl font-normal text-black"
        >
          <span className="text-2xl uppercase font-semibold">out of the stock</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0  max-h-[300px] overflow-y-scroll ">
        {!stocked ? (
          <Loading />
        ) : (
          <ul className="flex flex-col gap-4 ">
            {stocked &&
              stocked.stocked.map((supplier, i) => (
                <li className="flex items-center gap-4" key={i}>
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                  </span>
                  <Typography className="font-normal">
                    Barcode: {supplier.bar_code}
                    {"   "}Power: {supplier.power}
                    {"   "}Type: {supplier.product.type}
                  </Typography>
                </li>
              ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
