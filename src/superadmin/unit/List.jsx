import Sidebar from '../../components/sidebar/Sidebar'
import  { Link } from 'react-router-dom';
import "../admin.scss"
import "./list.scss"
import Navbar from '../../components/panelnavbar/Navbar'

import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom'


const List = () => {


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

                    </div>

                </div>
            </div>
        </div>
    )
}

export default List