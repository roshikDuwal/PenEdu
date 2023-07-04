
import  { Link, useParams } from 'react-router-dom';
import "../../../admin.scss"
import "./assignmentlist.scss"


import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';

import Navbar from '../../../../components/panelnavbar/Navbar';
import Sidebar from '../../../../components/sidebar/Sidebar';
import CustomReactTable from '../../../../components/CustomReactTable/CustomReactTable';
import { Accordan } from '../../../../components/tableaccordan/Accordan';
import { getAssignments } from '../../../../services/assignments';
import { getUnits } from '../../../../services/units';


const ListAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const {id} = useParams();

  const getData = async () => {
    setLoading(true);
    const data = await getAssignments(id);
    setData(data.unitAssignment);

    const units = await getUnits();
    setUnits(units.unit);

    setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = useMemo(
        () => [

            { Header: 'Assignment Id', accessor: 'id' },
            { Header: 'Assignment Name', accessor: 'title' },
            {
                Header: "Unit",
                Cell: ({ row }) =>
                  (<>{units.length && row.original.unit_id
                    ? units.find((unit) =>
                        unit.id.toString() === row.original.unit_id
                      ).unit_name
                    : ""}</>),
            },

            {
                Header: 'Action', Cell: ({ row }) => (
                    <>
                      <div className="actionbox">
                        <div className="update">

                        <button onClick={(e) => {
                            e.stopPropagation();
                            setOpenAccordan(row.original.id)
                        }}>
                            <MoreHorizIcon />
                          </button>
                          {openAccordan === row.original.id && <Accordan setOpenAccordan={setOpenAccordan} />}
                        </div>
                      </div>

                    </>

                )
            }
        ],
        [openAccordan, units]
    );


    return (
        <div className="adminpanel">
            <Sidebar />
            <div className="adminpanelpage">
                <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
                <div className="learner-box">

                    <div className="navigation">
                        <NavLink to="/admin">Admin</NavLink> <ChevronRightIcon /> <NavLink to="/admin/unit">Units</NavLink>  <ChevronRightIcon />  <p>Assignment</p>
                    </div>

                    <div className="learner-list-box">
                        <div className="modal-btn">
                            <h5>Assignment Details</h5>
                        </div>

                        <CustomReactTable columns={columns} data={data} rowClickable={true} loading={loading} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListAssignment