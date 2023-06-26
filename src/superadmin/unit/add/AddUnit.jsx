import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

import './addunit.scss';
import Button from '@mui/material/Button';
import { ThreeDots } from "react-loader-spinner";
import AddAssignmentCanvas from "./scanva/SCanva";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../../../components/panelnavbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CancelOutlined } from "@mui/icons-material";

const AddUnit = () => {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

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
          <Navbar />
          <div className="learner-box">
            <div className="navigation">
              <NavLink to="/admin">Admin</NavLink> <ChevronRightIcon />{" "}
              <p>Unit</p>
            </div>

            <div className="learner-list-box">
              <div className="modal-btn">
                <h5>Add Unit</h5>
                {!pdf && <div>
                  Add Assignment PDF:
                  <input
                    type="file"
                    onChange={uploadPDF}
                    name=""
                    id=""
                    height={"10"}
                  />
                </div>}
                <NavLink to="/admin/unit"><Button><CancelOutlined /> Cancel</Button></NavLink>
              </div>
              {loading && (
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
              )}
              {pdf && (
                <div>
                  <hr />
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

export default AddUnit;
