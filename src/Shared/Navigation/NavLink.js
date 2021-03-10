import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import "./NavLink.css"
import { AuthContext } from '../Context/AuthContext'

const NavLinks=()=> {
    const auth= useContext(AuthContext);
    return (
        <React.Fragment>
       
        <ul className='nav-links'>
         { auth.isLoggedIn && (<li>
         <NavLink to='/' exact >Users</NavLink>  
        </li>)}
        { !auth.isLoggedIn && (<li>
         <NavLink to='/auth'>Auth</NavLink>
        </li>)}
        { auth.isLoggedIn && (<li>
         <NavLink to={`/${auth.userId}/profile`}>Edit Profile</NavLink>
        </li>)}
        { auth.isLoggedIn && (<li>
            <button onClick={auth.logout}>Log Out</button>
        </li>)}
        </ul>
        </React.Fragment>
    )
}

export default NavLinks;
