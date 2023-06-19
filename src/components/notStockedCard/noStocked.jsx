import {
  Card,
  CardHeader,
  CardBody,

  Typography,
 
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";


export default function NotStocked() {
 
  return (
    <Card
      variant="gradient"
      className="bg-gray-700  text-white w-[500px] max-w-[500px] p-8  rounded-lg"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-3 rounded-none border-b border-white/10 pb-5 text-center"
      >
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-2xl">Product out of stock</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">5 team members</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">200+ components</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">40+ built-in pages</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">1 year free updates</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">
              Life time technical support
            </Typography>
          </li>
        </ul>
      </CardBody>
  
    </Card>
  );
}
