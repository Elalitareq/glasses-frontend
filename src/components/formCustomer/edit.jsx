import { useState } from "react";
import { toast } from "react-hot-toast";

export function EditForm() {
    const [formValues, setFormValues] = useState({});
  const openModal = () => {
    const modal = document.getElementById("authentication-modal");
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    const modal = document.getElementById("authentication-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  };
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
      const response = await fetch(`${process.env.REACT_APP_URL}/customer`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(formValues),
      });
toast.success("Customer edit successfully",{style: {
    borderRadius: '10px',
    background: '#374151',
    color: '#fff',
  },})
    console.log(response);
    } catch (error) {
        toast.error("Try again",{style: {
            borderRadius: '10px',
            background: '#374151',
            color: '#fff',
          },})
      console.log('Error sending data:', error);
    }
    closeModal();
  };
  return (
    <>
      <button
        onClick={openModal}
        className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
      >
       Edit
      </button>

      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50  "
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-70">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={closeModal}
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
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-white">
              Edit Customer
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                 htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  onChange={handleInputChange}
                  id="email"
                  placeholder="Company"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                 htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  id="email"
                  className="bg-gray-50 border border-gray-700 text-gray-700 text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                 htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  id="password"
                  placeholder="Lebanon"
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
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
      </div>
    </>
  );
}
