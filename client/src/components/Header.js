import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';



function Header(){
    return (
        <div className="header">
            <h1 className='headerText'>IVDB</h1>
            <Link className="text-light" to="/signup">
            <h1 className="m-0">Signup</h1>
            </Link>
            <Link className="text-light" to="/login">
            <h1 className="m-0">Login</h1>
            </Link>
            <Link className="text-light" to="/profile">
            <h1 className="m-0">Profile</h1>
            </Link>
        </div>
    )
}

export default Header;