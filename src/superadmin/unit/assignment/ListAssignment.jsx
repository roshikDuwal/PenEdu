import Sidebar from '../../../components/sidebar/Sidebar'
import { Link, useParams } from 'react-router-dom';
import "../../admin.scss"
import "./list.scss"
import Navbar from '../../../components/panelnavbar/Navbar'

import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom'
import CustomReactTable from '../../../components/CustomReactTable/CustomReactTable';
import { useEffect, useMemo, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { Accordan } from '../../../components/tableaccordan/Accordan';
import { getAssignments } from '../../../services/assignments';
import { getUnits } from '../../../services/units';
import { getCurrentRole, roles } from '../../../utils/common';


const ListAssignment = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [units, setUnit] = useState([]);
    const [openAccordan, setOpenAccordan] = useState(null);
    const { id } = useParams();

    const getData = async () => {
        setLoading(true);
        const data = await getAssignments(id);
        setData(data.unitAssignment);

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

    const columns = useMemo(
        () => [

            { Header: 'Assignment Id', accessor: 'id' },
            { Header: 'Assignment Name', accessor: 'title' },
            {
                Header: "Created At",
                Cell: ({ row }) =>
                (<>{new Date(row.original.created_at).toLocaleString()}</>),
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
                        <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
                        <NavLink to="./../..">Courses</NavLink> <ChevronRightIcon />
                        <NavLink to="./..">Units</NavLink> <ChevronRightIcon />
                        <p>Assignments</p>
                    </div>

                    <div className="learner-list-box">
                        <div className="modal-btn">
                            <h4>{units}</h4>
                            <h6>Assignments</h6>

                            {getCurrentRole() === roles.admin ? <Link to="add"><Button><AddIcon />Add Assignment</Button></Link> : null}
                        </div>

                        <CustomReactTable columns={columns} data={data} rowClickable={true} loading={loading} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListAssignment