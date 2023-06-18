import React, { useState, useEffect } from "react";
import Select from "react-select";

function MyComboboxProduct({ onSelectedProducts }) {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/productInfo`
        );
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData.message);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };

    fetchData();
  }, []);

  const setHandle = (e) => {
    const selectedProductIds = Array.isArray(e)
      ? e.map((product) => product.value)
      : [];


    if (typeof onSelectedProducts === "function") {
      onSelectedProducts(selectedProductIds);
    }
  };

  return (
    <div className=" container py-2">
      {data.length > 0 && (
        <div>
          <div className=" px-2">
            <Select
              options={data.map((item) => ({
                label: item.power,
                value: item._id,
              }))}
              placeholder="Select product"
              onChange={setHandle}
              isMulti
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyComboboxProduct;
