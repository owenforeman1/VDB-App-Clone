import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';




function Header(){
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <div className="header">
            <Link className="text-light" to="/">
                <h1 className='headerText'>IVDB</h1>
            </Link>
            <div>
                {Auth.loggedIn() ? (
                    <>
                    <Link className="button" to="/me">
                        {Auth.getProfile().data.username}'s profile
                    </Link>
                        <button className="button" onClick={logout}>
                        Logout
                        </button>
                    </>
                ) : (
                    <>
                    <Link className="button" to="/login">
                        <button className="button">
                            Login
                        </button>
                    </Link>
                    <Link className="button" to="/signup">
                        <button>Signup</button>
                    </Link>
                    </>
                )}   
            </div>
        </div>
    )
}

export default Header;