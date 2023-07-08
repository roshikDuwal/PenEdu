import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

import './addassignment.scss';
import Button from '@mui/material/Button';
import { ThreeDots } from "react-loader-spinner";
import AddAssignmentCanvas from "./scanva/SCanva";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../../../components/panelnavbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CancelOutlined } from "@mui/icons-material";
import { getUnits } from "../../../services/units";


const AddAssignment = () => {
  const [pdf, setPdf] = useState(null);
    const [unit, setUnit] = useState();
    const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getData = async () => {
      setLoading(true);

      const units = await getUnits();
      setUnit(units.unit.length && id
          ? units.unit.find((unit) =>
              unit.id.toString() === id
          ).unit_name : null);

      setLoading(false);
  };

  useEffect(() => {
      getData();
  }, []);
  const uploadPDF = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    pdfjsLib
      .getDocument(URL.createObjectURL(file))
      .promise.then((pdf) => {
        setPdf(pdf);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };


  return (
    <>
      <div className="adminpanel">
        <Sidebar />
        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
          <div className="learner-box">
            <div className="navigation">

              <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
              <NavLink to="./../../..">Courses</NavLink> <ChevronRightIcon />
              <NavLink to="./../..">Units</NavLink> <ChevronRightIcon />
              <NavLink to="./..">Assignments</NavLink> <ChevronRightIcon />
              <p>Add</p>
            </div>

            <div className="learner-list-box">
              <div className="modal-btn">
                <h4>{unit}</h4>
                {!pdf ? <div>
                  <h5>Add Assignment PDF:
                  <input
                    type="file"
                    onChange={uploadPDF}
                    name=""
                    id=""
                    className="form-control"
                    height={"10"}
                  /></h5>
                </div> : <h5>Add Assignment</h5>}
                <NavLink to="./.."><Button><CancelOutlined /> Cancel</Button></NavLink>
              </div>
              {loading && (
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#0AB39C"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              )}
              {pdf && (
                <div>
                  <AddAssignmentCanvas pdf={pdf} />
                </div>
              )}
            </div>




          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssignment;
