import { useState } from "react";
import { toast } from "react-hot-toast";

import {  FiTrash } from "react-icons/fi";
export function Delete(props) {
  const [open,setOpen]=useState(false)
  const {  setRows } = props;
  const handleDelete = async () => {
    if(props.title==="invoice"){
      try {
        const response = await fetch(
          `http://localhost:8000/api/${props.url}/${props.id}`,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if(response.ok){
        toast.success("Customer deleted successfully", {
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
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/${props.url}/${props.id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.ok){
      setRows((prevRows) => prevRows.filter((row) => row._id !== props.id));
      toast.success("Customer deleted successfully", {
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
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="block text-red-400 font-extrabold text-xl hover:text-red-600 hover:scale-125 transition-all duration-300"
        type="button"
        onClick={e=>setOpen(true)}
      >
       <FiTrash/>
      </button>

     {open&& <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-[#00000090] "

      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-[#3e818b] rounded-lg shadow  dark:bg-[#3e818b]">
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
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-white w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                Are you sure you want to delete this {props.title}?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={e=>setOpen(false)}
                className="text-white bg-[#3e818b] hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-[#3e818b] dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
