import { useState } from "react";
import { toast } from "react-hot-toast";
import MyComboboxProduct  from "./product";
import Type from "./customer";
import { useNavigate } from "react-router-dom";
export function AddSale() {
  const [open, setOpen] = useState(false);
 const [product,setProduct]=useState([])


 const navigate = useNavigate();
 const [customer, setSelectedCustomerId] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(product)
    const data = {
      products: product.map((productId) => ({
        product: productId,
        quantity: 1,
      })),
      customer: customer,
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("sales created successfully", {
        style: {
          borderRadius: "10px",
          background: "#374151",
          color: "#fff",
        },
      });
      const res=await response.json();
      console.log(res)
      // navigate({ pathname:`/invoice/${res.message._id}` });
    } catch (error) {
      toast.error("Try again", {
        style: {
          borderRadius: "10px",
          background: "#374151",
          color: "#fff",
        },
      });
      console.log("Error sending data:", error);
    }
  
  };
  const handleSelectedProducts = (selectedProductIds) => {
    console.log(selectedProductIds);
setProduct(selectedProductIds)
  };
  
  const handleSelectedCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    console.log(customer)
  };
  return (
    <>
      <button
        onClick={e=>setOpen(true)}
        className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
      >
        Add
      </button>

      {open&& <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-[#00000090]"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-70">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={e=>setOpen(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8 bg-gray-700 text-white">
            <h3 className="mb-4 text-xl font-medium ">
              Add New Product
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
              <Type onSelectedCustomer={handleSelectedCustomer} />
                <MyComboboxProduct onSelectedProducts={handleSelectedProducts} />



              </div>
              <div className="flex justify-between">
                <div className="flex items-start"></div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300"></div>
            </form>
          </div>
        </div>
      </div>}
    </>
  );
}
