import React ,{useContext}from 'react'
import UserContent from './UserContent'
import './UserList.css'
import {AuthContext} from '../../Shared/Context/AuthContext'
const UsersList=({users})=> {
    const auth=useContext(AuthContext); 
    return (
        <div>
         <ul className="users-list">
         {users.length&&
           users.map((user)=>{
               if(auth.isLoggedIn && user.id!==auth.userId){
               return <UserContent user={user}/>}
           })}  
         </ul> 
        </div>
    )
}


export default UsersList;
