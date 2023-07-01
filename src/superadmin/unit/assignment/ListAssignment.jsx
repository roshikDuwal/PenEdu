import Sidebar from '../../../components/sidebar/Sidebar'
import  { Link, useParams } from 'react-router-dom';
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
            {
                Header: "Unit",
                Cell: ({ row }) =>
                  (<>{units.length && row.original.unit_id
                    ? units.find((unit) =>
                        unit.id.toString() === row.original.unit_id
                      ).unit_name
                    : ""}</>),
            },
            { Header: 'Assignment Id', accessor: 'id' },
            { Header: 'Assignment Name', accessor: 'title' },

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

                        <CustomReactTable columns={columns} data={data} rowClickable={true} loading={loading} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListAssignment