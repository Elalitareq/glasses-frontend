import React, { useState, useEffect, useRef } from "react";
import { FcAddRow } from 'react-icons/fc'
import { CiCircleRemove } from 'react-icons/ci'

function MyComboboxProduct({ onSelectedProducts }) {
  const [inputs, setInputs] = useState([{ id: 0, value: "" }]);
  const [nextId, setNextId] = useState(1);
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);

    // Call onSelectedProducts with updated input values
    if (typeof onSelectedProducts === "function") {
      const selectedProducts = newInputs.map((input) => input.value);
      onSelectedProducts(selectedProducts);
    }
  };

  const handleAddInput = (event) => {
    event.preventDefault(); // Prevent form submission

    setInputs([...inputs, { id: nextId, value: "" }]);
    setNextId(nextId + 1);
  };

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1].focus();
    }
  }, [inputs]);

  return (
    <div className="container py-2 text-black">
      {inputs.map((input, index) => (
        <div key={input.id} className="flex mb-2">
          <input
            type="text"
            placeholder="Barcode"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            ref={(ref) => (inputRefs.current[index] = ref)} // Assign the input reference to the corresponding index
          />
          {/* <button onClick={() => handleRemoveInput(index)}>
            <CiCircleRemove />
          </button> */}
        </div>
      ))}
      <button onClick={handleAddInput} className="flex justify-center items-center text-white">
        <FcAddRow className="w-10 h-10" />
        <span>Add Product</span>
      </button>
    </div>
  );
}

export default MyComboboxProduct;
