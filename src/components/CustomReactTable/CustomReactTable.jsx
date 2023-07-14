import React from "react";
import { useTable } from "react-table";
import "./customtable.scss";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getCurrentRole, roles } from "../../utils/common";

const CustomReactTable = ({ columns, data, loading, rowClickable }) => {
  let navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: {
        hiddenColumns:
          getCurrentRole() === roles.student ? ["Action", "Academic Year", "Sent"] : ["Submitted"],
      },
    });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#5b58ff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </>
      ) : (
        <>
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length ? (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={rowClickable ? "link" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        rowClickable && navigate(row.original.id.toString());
                      }}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={100}>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomReactTable;
