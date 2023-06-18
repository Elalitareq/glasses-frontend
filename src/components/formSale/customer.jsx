import { useEffect, useState } from "react";

const Type = ({ onSelectedCustomer }) => {
  const [data, setData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/customer/all`
        );
        const data = await response.json();
        setData(data.message);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectCustomer = (event) => {
    const customerId = event.target.value;
    setSelectedCustomer(customerId);

  
      onSelectedCustomer(customerId);
    
  };

  return (
    <>
      <div className="relative w-full lg:max-w-sm">
        <select
          placeholder="power"
          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          onChange={handleSelectCustomer}
        >
          {data.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.company_name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Type;
