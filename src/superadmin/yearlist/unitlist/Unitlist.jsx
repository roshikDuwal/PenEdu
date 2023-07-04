import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./unitlist.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/panelnavbar/Navbar";
import CustomReactTable from "../../../components/CustomReactTable/CustomReactTable";
import { Accordan } from "../../../components/tableaccordan/Accordan";
import { error } from "../../../utils/toast";
import { getUnits } from "../../../services/units";



const List = () => {

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const {courseid}= useParams();

  //get Unit Data
  const getData = async () => {
    setLoading(true);
    try {
      const data = await getUnits();
      setCourses(
        data.course.map((data) => {
          return { label: data.course_name, value: data.id };
        })
      );
      
      const filteredData = data.unit.filter((unitElem)=> unitElem.course_id===courseid)
      setData(filteredData);
    } catch (e) {
      error(e.message);
    }
    setLoading(false);
  };


  useEffect(() => {
    getData();
  }, [courseid]);

  const columns = useMemo(
    () => [

      { Header: "Unit Id", accessor: "id" },
      { Header: "Unit Name", accessor: "unit_name" },
      { Header: "Unit Code", accessor: "unit_code" },
      {
        Header: "Course",
        Cell: ({ row }) =>
          (<>{courses.length && row.original.course_id
            ? courses.find((course) =>
                course.value.toString() === row.original.course_id
              ).label
            : ""}</>),
      },

      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="update">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenAccordan(row.original.id);
                  }}
                >
                  <MoreHorizIcon />
                </button>
                {openAccordan === row.original.id && (
                  <Accordan setOpenAccordan={setOpenAccordan} />
                )}
              </div>
            </div>
          </>
        ),
      },
    ],
    [openAccordan, courses]
  );





  return (
    <div className="adminpanel">
      <Sidebar />
      <div className="adminpanelpage">
        <Navbar />
        <div className="learner-box">
          <div className="navigation">
            <NavLink to="/admin">Admin</NavLink> <ChevronRightIcon />{" "}
            <p>Units</p><ChevronRightIcon />{" "}  <p>{courseid}</p>
          </div>

          <div className="learner-list-box">
          <div className="modal-btn">
              <h5>Unit Details</h5>
              
            </div>




            <CustomReactTable
              columns={columns}
              data={data}
              loading={loading}
              rowClickable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
