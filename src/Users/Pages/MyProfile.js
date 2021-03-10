import React, { useContext, useState, useEffect } from "react";
import MyComp from '../Components/MyComp'
import './../Components/UserList.css'
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useHttpClient } from "../../Shared/Hooks/httpHooks";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/UIElements/ErrorModal";

const MyProfile = ({uid}) => {
  const auth = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(auth);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/user/${uid}`);
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/user/${uid}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        setProfile(responseData.users);
      } catch (error) {}
    };

    fetchProfile();
  }, [uid]);

  return (
     <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading&& <LoadingSpinner asOverlay/>}
        <ul className='users-list'>
       {profile&& <MyComp user={profile} uid={uid}/>   }
       </ul>
     </React.Fragment> 
  );
};

export default MyProfile;
