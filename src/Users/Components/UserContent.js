import React from 'react';
import Card from '../../Shared/Card';
import {Link} from 'react-router-dom';
import './UserContent.css'
const  UserContent=({user})=> {
    return (
        <li className="user-item">
            <Card className="user-item__content">
            <Link to={`/${user.id}/chat`}>
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

export default UserContent
