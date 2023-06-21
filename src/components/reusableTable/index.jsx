import React from "react";
import Loading from "../loading/loading";

const ReusableTable = ({ columns, rows }) => {
  return (
    <>
      <table className="min-w-full border border-gray-300 rounded overflow-hidden shadow-lg">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className=" border-r border-white bg-[#3e818b] px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
{rows.length!==0?( <tbody className=" bg-[#3e818b]">
          {rows &&
            rows.map((row, index) => (
              <tr key={row._id} className="">
                {columns &&
                  columns.map((column) => (
                    <td
                      key={column.accessor}
                      className={`px-6 py-5 border rounded-sm  font-semibold whitespace-nowrap text-sm border-gray-300 text-gray-900 ${
                        index % 2 === 0 ? " bg-gray-200" : " bg-white"
                      }`}
                    >
                      {column.accessor === "isStocked" && column.renderCell
                        ? column.renderCell({ row })
                        : column.accessor === "products" && column.renderCell
                        ? column.renderCell({ row })
                        : column.accessor === "customer" && column.renderCell
                        ? column.renderCell({ row })
                        : column.accessor === "Action" && column.renderCell
                        ? column.renderCell({ row })
                        : row[column.accessor]}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>):( <tr>
              <td colSpan={columns.length}>
                <Loading />
              </td>
            </tr>)}
       
      </table>
    </>
  );
};

export default ReusableTable;
