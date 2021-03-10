import React from 'react';
import {Link} from 'react-router-dom'
import './UserContent.css'
import Card from '../../Shared/Card'
const  MyComp=({user,uid})=> {
  
    return (
            <li className="user-item">
            <Card className="user-item__content">
              <Link to={`/${uid}/profile`}>
              <div className="user-item__image">
               <div className="avatar"> 
               <img src={`${process.env.REACT_APP_ASSET_URL}/${user.image}`}/>
               </div>
              </div>
                <div className="user-item__info">
                   <h2>{user.name}</h2>
                   <h3> {user.status}</h3>
               </div>
               </Link>
            </Card>
            </li>
            
        
         
    )
}

export default MyComp;
