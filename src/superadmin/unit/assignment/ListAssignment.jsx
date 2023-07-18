import Sidebar from "../../../components/sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import "../../admin.scss";
import "./list.scss";
import Navbar from "../../../components/panelnavbar/Navbar";

import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { NavLink } from "react-router-dom";
import CustomReactTable from "../../../components/CustomReactTable/CustomReactTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { Accordan } from "../../../components/tableaccordan/Accordan";
import {
  addSchedule,
  deleteAssignmentData,
  getAssignments,
  getSubmits,
} from "../../../services/assignments";
import { getUnits, getUnitsByCourse } from "../../../services/units";
import { getCurrentRole, roles } from "../../../utils/common";
import { ThreeDots } from "react-loader-spinner";
import { error, success } from "../../../utils/toast";

const ListAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [units, setUnit] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const { id, courseid } = useParams();

  const getData = async () => {
    setLoading(true);
    const data = await getAssignments(id);

    let units;
    if (getCurrentRole() !== roles.admin) {
      units = await getUnitsByCourse(courseid);
      units = units.units || units.unit;
    } else {
      units = await getUnits();
      units = units.unit;
    }
    const unit =
      units.length && id
        ? units.find((unit) => unit.id.toString() === id.toString())
        : null;
    setUnit(unit?.unit_name);

    let assignments = data.unitAssignment || data.unitAssignments;
    if (getCurrentRole() === roles.student) {
      const submits = await getSubmits(unit.id);
      submits.getAssessment.map((submit) => {
        assignments = assignments.map((asgn) => {
          if (asgn.id.toString() === submit.unit_assignment_id) {
            return { ...asgn, submit: submit };
          }
          return asgn;
        });
      });
    }
    setData(assignments);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      // { Header: 'Assignment Id', accessor: 'id' },
      { Header: "Assignment Name", accessor: "title" },
      {
        Header: "Schedule",
        Cell: ({ row }) => {
          const schedule =
            (row.original.assignment_schedule?.length &&
              row.original.assignment_schedule[0]) ||
            {};
          const [loading, setLoading] = useState(false);
          const [startDate, setStartDate] = useState(schedule.start_date);
          const [endDate, setEndDate] = useState(schedule.end_date);

          const handleChange = async () => {
            if (
              !schedule.end_date &&
              !schedule.start_date &&
              startDate &&
              endDate
            ) {
              setLoading(true);
              try {
                await addSchedule({
                  unit_assignment_id: row.original.id.toString(),
                  start_date: startDate,
                  end_date: endDate,
                  unit_id: id,
                });
                success("Schedule added to the assignment!");
                setLoading(false);
              } catch (e) {
                error(e.message || "Failed to add schedule!");
                setLoading(false);
              }
            }
          };

          useEffect(() => {
            handleChange();
          }, [startDate, endDate]);

          return (
            <div className="">
              {loading ? (
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
              ) : (
                <>
                  {" "}
                  {getCurrentRole() === roles.admin ? (
                    <>
                      <div className="date">
                        <label htmlFor="startDate">Start Date: </label>
                        <input
                          type="date"
                          className="form-control form-control-sm col-2"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          max={endDate}
                          name="startDate"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            e.stopPropagation();
                          }}
                        />
                      </div>
                      <div className="date">
                        <label htmlFor="endDate">End Date: </label>
                        <input
                          type="date"
                          className="form-control form-control-sm col-2"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          min={startDate}
                          name="endDate"
                          onChange={(e) => {
                            setEndDate(e.target.value);
                            e.stopPropagation();
                          }}
                          value={endDate}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="date">
                        <label htmlFor="startDate">
                          Start Date: {schedule.start_date || "-"}
                        </label>
                      </div>
                      <div className="date">
                        <label htmlFor="endDate">
                          End Date: {schedule.end_date || "-"}
                        </label>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        },
      },
      {
        Header: "Total Score",
        Cell: ({ row }) => row.original.score || "-",
      },
      {
        Header: "Sent",
        Cell: ({ row }) => (
          <FormControlLabel
            onClick={(e) => {
              e.stopPropagation();
            }}
            control={<Switch />}
          />
        ),
      },
      {
        Header: "Submitted",
        Cell: ({ row }) =>
          row.original?.submit ? (
            <span className="status-green">SUBMITTED</span>
          ) : (
            <span className="status-orange">PENDING</span>
          ),
      },
      {
        Header: "Updated At",
        Cell: ({ row }) =>
          row.original.updated_at
            ? new Date(row.original.updated_at).toLocaleString()
            : "-",
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
                  <Accordan
                    setOpenAccordan={setOpenAccordan}
                    handleDelete={async () => {
                      try {
                        setLoading(true);
                        await deleteAssignmentData(row.original.id);
                        success("Assignment deleted successfully!");
                        getData();
                      } catch (e) {
                        error(e.message || "Failed to delete assignment!");
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </>
        ),
      },
    ],
    [openAccordan, units, data]
  );

  return (
    <div className="adminpanel">
      <Sidebar />
      <div className="adminpanelpage">
        <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
        <div className="learner-box">
          <div className="navigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
            <NavLink to="./../..">Courses</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Units</NavLink> <ChevronRightIcon />
            <p>Assignments({units})</p>
          </div>

          <div className="learner-list-box">
            <div className="modal-btn">
              <h4>{units}</h4>
              <h6>Assignments</h6>

              {getCurrentRole() === roles.admin ? (
                <Link to="add">
                  <Button>
                    <AddIcon />
                    Add Assignment
                  </Button>
                </Link>
              ) : null}
            </div>

            <CustomReactTable
              columns={columns}
              data={data}
              rowClickable={true}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAssignment;
