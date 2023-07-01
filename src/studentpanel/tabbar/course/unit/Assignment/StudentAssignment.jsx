import React, { useEffect, useMemo, useState } from 'react'

import { NavLink, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../../../../student.scss"
import Overview from '../../../overview/Overview';
import Navbar from '../../../../../components/panelnavbar/Navbar';
// import CustomReactTable from "../../../../../components/customreacttable/CustomReactTable"
import CustomReactTable from '../../../../../components/CustomReactTable/CustomReactTable';
import { getAssignments } from '../../../../../services/assignments';
import { getUnits } from '../../../../../services/units';

const StudentAssignment = () => {
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

    ],
    [openAccordan, units]
);


  return (
    <>
      <div className="studentpanel">

        <div className="adminpanelpage">
          <Navbar data={data} />

          {/* -----startpage title---   */}
          <div className="navigation">
            <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div>
          </div>
          {/* ---start-page end---  */}


          {/* student page starts  */}
          <section className="studentpage">
            <div className="studentdescription">

              <div className="info">

                <h2>Logo</h2>
                <div className="name">
                  <h5>Roshin Lakhemaru</h5>
                  <p>1234789</p>
                </div>
              </div>

              <div className="studentnavbar">
                <Tabs defaultIndex={1}>
                  <TabList>
                    <Tab > OverView</Tab>
                    <Tab>Assignment</Tab>
                    <Tab>Result</Tab>
                  </TabList>

                  <TabPanel>
                    <div className='tabbar'>
                      <Overview />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className='tabbar'>
                      <NavLink to="/student"><Button>Back</Button></NavLink>
                      <CustomReactTable columns={columns} data={data}  rowClickable={true} />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className='tabbar'>
                      Result
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>

          </section>


        </div>
      </div>
    </>
  )

}

export default StudentAssignment