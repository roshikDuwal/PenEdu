import Sidebar from '../../components/sidebar/Sidebar'
import  { Link } from 'react-router-dom';
import "../admin.scss"
import "./list.scss"
import Navbar from '../../components/panelnavbar/Navbar'

import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom'
import CustomReactTable from '../../components/CustomReactTable/CustomReactTable';
import { useMemo, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { Accordan } from '../../components/tableaccordan/Accordan';


const List = () => {
    const [openAccordan, setOpenAccordan] = useState(null);

    const data = useMemo(
        () => [
            { id: 1, name: 'Algebra', courseno: 28261, type: 'onshore' },
            { id: 2, name: 'Science', courseno: 32261, type: 'offshore' },
        ], []);


    const columns = useMemo(
        () => [
            { Header: 'Unit Id', accessor: 'id' },
            { Header: 'Unit Name', accessor: 'name' },
            { Header: 'Course', accessor: 'courseno' },
            {
                Header: 'Action', Cell: ({ row }) => (
                    <>
                      <div className="actionbox">
                        <div className="update">

                        <button onClick={() => setOpenAccordan(row.original.id)}>
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
                        <NavLink to="/admin">Admin</NavLink>  <ChevronRightIcon />  <p>Units</p>
                    </div>

                    <div className="learner-list-box">
                        <div className="modal-btn">
                            <h5>Unit Details</h5>
                            <Link to="/admin/unit/add"><Button><AddIcon />Add Unit</Button></Link>
                        </div>

                        <CustomReactTable columns={columns} data={data} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default List