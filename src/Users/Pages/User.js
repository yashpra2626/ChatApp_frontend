import React ,{useState,useContext, useEffect} from 'react'
import UserList from '../Components/UserList';
import ErrorModal from '../../Shared/UIElements/ErrorModal'
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner'
import { useHttpClient } from '../../Shared/Hooks/httpHooks';
import {AuthContext} from '../../Shared/Context/AuthContext'


const  User=()=> {
    const auth=useContext(AuthContext);
    const [loadedUsers,setLoadedUsers] = useState();
    const {isLoading,error,sendRequest,clearError} = useHttpClient();
    
    useEffect(()=>{
      const fetchUsers=async()=>{
          try {
             const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/myusers`,
             "GET",
             null,
             {
              "Content-Type": "application/json",
              Authorization: 'Bearer '+ auth.token
            });
            setLoadedUsers(responseData.users);
         } catch (err) {
               console.log(err);
           }
      }
      fetchUsers();
    },[])
    
    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading&& <LoadingSpinner asOverlay/>}
        {loadedUsers&& <UserList users={loadedUsers}/>}
        </React.Fragment>
    )
}

export default User

