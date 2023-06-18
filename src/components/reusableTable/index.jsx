import React from "react";

const ReusableTable = ({ columns, rows }) => {
 
  return (
    <>
      <table className="min-w-full border border-gray-300 rounded overflow-hidden shadow-lg">
        <thead >
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className=" border-r border-white bg-gray-700 px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" bg-gray-700">
          {rows.map((row,index) => (
            <tr
              key={row._id}
              className=""
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className={`px-5 py-3 border rounded-sm  font-semibold whitespace-nowrap text-sm border-gray-300 text-gray-900 ${index % 2 === 0 ? " bg-gray-200" : " bg-white"}`}
                >
                  {column.accessor !== "Action"
                    ? row[column.accessor]
                    : column.renderCell({ row })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReusableTable;
