import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Delete } from "../../components/delete/delete";
import Loading from "../../components/loading/loading";

function Invoice() {
  const { saleId } = useParams();
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/sale/${saleId}`
        );
        const data = await response.json();
        console.log(data);
        setSale(data.message[0]);
        setLoading(true);
      } catch (error) {
        console.log("Error sending data:", error);
      }
    };
    fetchData();
  }, [saleId]);

  useEffect(() => {
    if (sale.products && sale.products.length > 0) {
      const totalPrice = sale.products.reduce((sum, product) => {
        return sum + product.quantity * product.product_id.selling_price;
      }, 0);
      setTotal(totalPrice);
    }
  }, [sale]);

  const handleQuantityChange = async (productIndex, quantity) => {
    const updatedProducts = [...sale.products];
    updatedProducts[productIndex].quantity = quantity;
    setSale((prevSale) => ({ ...prevSale, products: updatedProducts }));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/sale/${saleId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: updatedProducts }),
        }
      );
      console.log(response);
    } catch (error) {
      console.log("Error sending data:", error);
    }
  };

  const handleDiscountChange = async (event) => {
    setSale((prevSale) => ({ ...prevSale, discount: event.target.value }));
    const discount = event.target.value;

    if (sale.products && sale.products.length > 0) {
      const totalPrice = sale.products.reduce((sum, product) => {
        return sum + product.quantity * product.product_id.selling_price;
      }, 0);

      const discountedPrice = totalPrice - (totalPrice * discount) / 100;
      const updatedTotal = discountedPrice.toFixed(2);
      setTotal(updatedTotal);
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/sale/${saleId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ discount: event.target.value }),
        }
      );
      console.log(response);
    } catch (error) {
      console.log("Error sending data:", error);
    }
  };

  if (loading) {
    return (
      <>
        <section className="title">
          <h1>Invoice</h1>
        </section>
        <div className="flex items-center justify-center  text-gray-700">
          <div className="w-[80%] bg-white shadow-lg">
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
                  {sale.customer.company_name}
                </address>
              </div>
              <div></div>
            </div>
            <div className="flex justify-center p-4">
              <div className="border-b border-gray-200 shadow p-4 w-[100%]">
                <table className="w-[100%]">
                  <thead className="bg-gray-700 text-white w-[100%]">
                    <tr className="w-[100%]">
                      <th className=" border-r border-white bg-gray-700 px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider ">
                        #
                      </th>
                      <th className=" border-r border-white bg-gray-700 px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider">
                        Product
                      </th>
                      <th className=" border-r border-white bg-gray-700 px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className=" border-r border-white bg-gray-700 px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider">
                        Price
                      </th>
                      <th className=" border-r border-white bg-gray-700 px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider">
                        total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {sale &&
                      sale.products&&sale.products.map((product, index) => (
                        <tr
                          className={`px-6 py-5 border rounded-sm  font-semibold whitespace-nowrap text-sm border-gray-300 text-gray-900 ${
                            index % 2 === 0 ? " bg-gray-200" : " bg-white"
                          }`}
                        >
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {product.barcode}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {product.product_id&&product.product_id.power}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(index, e.target.value)
                              }
                              className={`border rounded-sm  font-semibold whitespace-nowrap text-sm  text-gray-900 ${
                                index % 2 === 0 ? " bg-gray-200" : " bg-white"
                              }`}
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            ${product.product_id&&product.product_id.selling_price}
                          </td>
                          <td className="px-6 py-4">
                            {product.quantity * product.product_id&&product.product_id.selling_price}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <th colSpan="3"></th>
                      <td className="px-6 py-5   font-semibold whitespace-nowrap text-sm  text-gray-900">
                        <b>Discount</b>
                      </td>
                      <td className="text-sm font-bold">
                        <input
                          type="number"
                          value={sale.discount}
                          onChange={handleDiscountChange}
                          className="text-sm font-bold"
                        />
                        <span>%</span>
                      </td>
                    </tr>
                    <tr className="px-6 py-5   font-semibold whitespace-nowrap text-sm text-white bg-gray-900">
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
                <button className="px-4 py-2 text-sm text-green-600 bg-green-100">
                  Print
                </button>
                <button className="px-4 py-2 text-sm text-red-600 bg-red-100">
                  <Delete title="invoice" url="sale" id={saleId} />
                </button>
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
