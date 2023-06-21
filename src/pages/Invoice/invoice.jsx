import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import { Delete } from "../../components/delete/delete";
import Loading from "../../components/loading/loading";

function Invoice() {
  const { saleId } = useParams();
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [isChanged, setIsChanged] = useState(false); // New state variable
const [changeLoading,setChangeLoading]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/sale/${saleId}`
        );
        const data = await response.json();
        setSale(data.message[0]);
        setUpdatedProducts(data.message[0].products);
        setLoading(true);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };
    fetchData();
  }, [saleId]);

  useEffect(() => {
    if(sale){
    if (sale.products && sale.products.length > 0) {
      let totalPrice = sale.products.reduce((sum, product) => {
        return sum + product.quantity * product.price;
      }, 0);
      totalPrice = totalPrice - (totalPrice * sale.discount) / 100;
      setTotal(totalPrice);
    }}
  }, [sale]);

  const handlePrint = () => {
    const printableDiv = document.getElementById("invoice");
    if (printableDiv) {
      const content = printableDiv.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = content;
      window.print();

      document.body.innerHTML = originalContents;
    }
  };

  const handleQuantityChange = (productIndex, quantity) => {
    const updatedProductsCopy = [...updatedProducts];
    updatedProductsCopy[productIndex].quantity = quantity;
    setUpdatedProducts(updatedProductsCopy);
    setIsChanged(true); // Set the state to indicate changes
  };

  const handleSave = async () => {
    if (isChanged) {
      setChangeLoading(true)
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/sale/${saleId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              products: updatedProducts,
              discount: sale.discount,
            }),
          }

        );
        if(response.ok){
          toast.success('Updated')
          setChangeLoading(false)
        }
  
      } catch (error) {
        console.log("Error sending data:", error);
        setChangeLoading(false)
      }
    }
  };

  const handleDiscountChange = async (event) => {
    setSale((prevSale) => ({ ...prevSale, discount: event.target.value }));
    const discount = event.target.value;

    if (sale.products && sale.products.length > 0) {
      const totalPrice = sale.products.reduce((sum, product) => {
        return sum + product.quantity * product.price;
      }, 0);

      const discountedPrice = totalPrice - totalPrice * (discount / 100);
      const updatedTotal = discountedPrice.toFixed(2);
      setTotal(updatedTotal);
    }

    setIsChanged(true); // Set the state to indicate changes
  };

  if (loading) {
    return (
      <>
        <section className="title">
          <h1>Invoice</h1>
        </section>
        <div
          className=" w-full flex items-center justify-center  text-gray-700"
          id="invoice"
        >
          <div className="w-[95%] mx-auto bg-white shadow-lg">
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="flex justify-between p-4">
              <div>
                <h6 className="font-bold">
                  Order Date :{" "}
                  <span className="text-sm font-medium">
                    {" "}
                    {sale.created_at}
                  </span>
                </h6>
              </div>
              <div className="w-40"></div>
              <div className="w-40">
                <address className="text-sm">
                  <span className="font-bold">To :</span>
                  {sale.customer&&sale.customer}
                </address>
              </div>
              <div></div>
            </div>
            <div className="flex justify-center p-4">
              <div className="border-b border-gray-200 shadow p-4 w-[100%]">
                <table className="w-[100%]">
                  <thead className="bg-[#3e818b] text-white w-[100%]">
                    <tr className="w-[100%]">
                      <th className=" border-r border-white bg-[#3e818b] px-4 py-2 text-left text-[20px] text-white uppercase tracking-wider ">
                        #
                      </th>
                      <th className=" border-r border-white bg-[#3e818b] px-4 py-2 text-left text-[20px] text-white uppercase tracking-wider">
                        Product
                      </th>
                      <th className=" border-r border-white bg-[#3e818b] px-4 py-2 text-left text-[20px] text-white uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className=" border-r border-white bg-[#3e818b] px-4 py-2 text-left text-[20px] text-white uppercase tracking-wider">
                        Price
                      </th>
                      <th className=" border-r border-white bg-[#3e818b] px-4 py-2 text-left text-[20px] text-white uppercase tracking-wider">
                        total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {sale &&
                      sale.products &&
                      sale.products.map((product, index) => (
                        <tr
                          key={index}
                          className={`px-4 py-3 border rounded-sm  font-semibold whitespace-nowrap text-sm border-gray-300 text-gray-900 ${
                            index % 2 === 0 ? " bg-gray-200" : " bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {product.barcode}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {product.product_power && product.product_power}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(index, e.target.value)
                              }
                              className={`border rounded-sm  font-semibold whitespace-nowrap text-sm w-20  text-gray-900 ${
                                index % 2 === 0 ? " bg-gray-200" : " bg-white"
                              }`}
                              min={0}
                            />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            ${product.price}
                          </td>
                          <td className="px-4 py-4">
                            $
                            {product.quantity *
                              product.price}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <th colSpan="3"></th>
                      <td className="px-4 py-3   font-semibold whitespace-nowrap text-sm  text-gray-900">
                        <b>Discount</b>
                      </td>
                      <td className="text-sm font-bold">
                        <input
                          max={100}
                          min={0}
                          type="number"
                          value={sale.discount || 0}
                          onChange={handleDiscountChange}
                          className="text-sm font-bold w-10"
                        />
                        <span>%</span>
                      </td>
                    </tr>
                    <tr className="px-4 py-3   font-semibold whitespace-nowrap text-sm text-white bg-gray-900">
                      <th colSpan="3"></th>
                      <td className="text-sm font-bold">
                        <b>Total</b>
                      </td>
                      <td className="text-sm font-bold">
                        <b>${total}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="p-4">
              <div className="flex items-end justify-end space-x-3">
                <button
                  className="px-4 py-2 text-sm text-green-600 bg-green-100"
                  onClick={handlePrint}
                >
                  Print
                </button>
             
                  {isChanged ?  ( !changeLoading? <button
                  className={`px-4 py-2 text-sm text-blue-600 bg-blue-200 `}
                  onClick={handleSave}
                >save</button>:<div  className={`px-1 py-1 text-sm text-blue-600 bg-blue-200  `}><Loading/></div> ): null}
                {" "}
                <div className="px-4 py-2 text-sm text-red-600 bg-red-100">
                  <Delete title="invoice" url="sale" id={saleId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <h1>
        <Loading />
      </h1>
    );
  }
}

export default Invoice;
