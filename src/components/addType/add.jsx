import { useState } from "react";
import { toast } from "react-hot-toast";

export function AddType({ onAddProduct }) {
  const [formValues, setFormValues] = useState({});
  const [open, setOpen] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Product added successfully", {
          style: {
            borderRadius: "10px",
            background: "#374151",
            color: "#fff",
          },
        });
        onAddProduct(data.message);
      } else {
        toast.error("Try again", {
          style: {
            borderRadius: "10px",
            background: "#374151",
            color: "#fff",
          },
        });
      }
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
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={(e) => setOpen(true)}
        className="px-3 py-2 bg-[#3e818b] rounded text-white hover:bg-[#2e6068] transition-colors duration-300"
        
        type="button"
      >
        Add
      </button>

      {open && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-[#00000090]  "
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-70">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-red-400 hover:text-red-600 transition-colors duration-300"
              data-modal-hide="authentication-modal"
              onClick={() => setOpen(false)}
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
              <span className="sr-only ">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8 bg-white text-black rounded">
              <h3 className="mb-4 text-xl font-medium ">Add New Type</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-3  font-medium "
                  >
                    Type:
                  </label>
                  <input
                    type="text"
                    name="type"
                    onChange={handleInputChange}
                    id="email"
                    className="w-full px-4 py-2 focus:outline-none bg-[#efefef] rounded"
                    placeholder="1.56 HMC EMI GREEN"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-start"></div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 w-full bg-[#3e818b] hover:bg-[#336b74] transition-colors duration-300 text-white font-semibold rounded"
                >
                  Save
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300"></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
