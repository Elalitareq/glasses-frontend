import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

export function EditAdmin({ id, updateRow }) {
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
      const response = await fetch(
        `${process.env.REACT_APP_URL}/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      const data = await response.json();

      updateRow(data.user);
      toast.success("Customer edited successfully", {
        style: {
          borderRadius: "10px",
          background: "#374151",
          color: "#fff",
        },
      });
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
        className="block text-gray-500  mr-4 font-extrabold text-xl hover:text-gray-800 hover:scale-125 transition-all duration-300"
        type="button"
      >
        <FiEdit />
      </button>

      {open && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50  bg-[#00000090] "
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-70">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-red-400 hover:text-red-600 transition-colors duration-300"
              data-modal-hide="authentication-modal"
              onClick={(e) => setOpen(false)}
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
           
                <div className="px-6 py-6 lg:px-8 bg-[#3e818b] text-white">
              <h3 className="mb-4 text-xl font-medium ">Edit Admin</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    id="name"
                    placeholder="Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    Username
                  </label>
                  <input
                    type="string"
                    name="email"
                    onChange={handleInputChange}
                    id="user"
                    className="bg-gray-50 border border-gray-700 text-gray-700 text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="username"
                    
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    id="pass"
                    className="bg-gray-50 border border-gray-700 text-gray-700 text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="....."
                  />
                </div>
      
                <div className="flex justify-between">
                  <div className="flex items-start"></div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#3e818b] hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 "></div>
              </form>
           
            </div>
          </div>
        </div>
      )}
    </>
  );
}
