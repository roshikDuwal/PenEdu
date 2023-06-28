import Sidebar from '../../../components/sidebar/Sidebar'
import  { Link } from 'react-router-dom';
import "../../admin.scss"
import "./list.scss"
import Navbar from '../../../components/panelnavbar/Navbar'

import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom'
import CustomReactTable from '../../../components/CustomReactTable/CustomReactTable';
import { useMemo, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { Accordan } from '../../../components/tableaccordan/Accordan';


const ListAssignment = () => {
    const [openAccordan, setOpenAccordan] = useState(null);

    const data = useMemo(
        () => [
            { id: 1, name: 'Assignment 1', courseno: 28261, type: 'onshore' },
            { id: 2, name: 'Assignment 2', courseno: 32261, type: 'offshore' },
        ], []);


    const columns = useMemo(
        () => [
            { Header: 'Assignment Id', accessor: 'id' },
            { Header: 'Assignment Name', accessor: 'name' },
            { Header: 'Unit', accessor: 'courseno' },
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
        [openAccordan]
    );


    return (
        <div className="adminpanel">
            <Sidebar />
            <div className="adminpanelpage">
                <Navbar />
                <div className="learner-box">

                    <div className="navigation">
                        <NavLink to="/admin">Admin</NavLink> <ChevronRightIcon /> <NavLink to="/admin/unit">Units</NavLink>  <ChevronRightIcon />  <p>Assignment</p>
                    </div>

                    <div className="learner-list-box">
                        <div className="modal-btn">
                            <h5>Assignment Details</h5>
                            <Link to="add"><Button><AddIcon />Add Assignment</Button></Link>
                        </div>

                        <CustomReactTable columns={columns} data={data} rowClickable={true} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListAssignment