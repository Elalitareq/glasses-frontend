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
                className="border-r border-white bg-[#3e818b] px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows&&rows.length !== 0 ? (
            rows.map((row, index) => (
              <tr key={row._id} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-6 py-5 border rounded-sm font-semibold whitespace-nowrap text-sm border-gray-300 text-gray-900`}
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
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <Loading />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ReusableTable;
