import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Accordan } from '../navbaraccordan/Accordan';
import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({data}) => {
  const [bool, setBool] = useState(false)
  return (
    <>
      <nav className='navbar'>
        <div className="inputbar">
          <input type="search" name="" id="" placeholder='Search...' />
          <SearchIcon />
        </div>

        <div className="profile">
          <button onClick={() => setBool(!bool)}>  <AccountCircleIcon />{data?.name}</button>
          {bool && <Accordan data={data} />}
        </div>
      </nav>
    </>
  )
}

export default Navbar