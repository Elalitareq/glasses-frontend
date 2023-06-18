import React from "react";

const ReusableTable = ({ columns, rows }) => {
 
  return (
    <>
      <table className="min-w-full bg-gray-700 border border-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-[20px] text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row._id}
              className={row._id % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
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
