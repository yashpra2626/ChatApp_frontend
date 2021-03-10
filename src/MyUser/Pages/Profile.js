import React ,{useState, useEffect,useContext}from 'react'
import './Profile.css'
import Input from './../../Shared/UIElements/Input'
import Button from './../../Shared/UIElements/Button'
import { VALIDATOR_REQUIRE} from '../../Users/Util/validators'
import useForm from '../../Shared/Hooks/formHooks'
import {AuthContext} from '../../Shared/Context/AuthContext'
import { useParams ,useHistory} from 'react-router-dom'
import {useHttpClient} from '../../Shared/Hooks/httpHooks'
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner'
import ErrorModal from '../../Shared/UIElements/ErrorModal'
import Modal from '../../Shared/UIElements/Modal'
import MyProfile from '../../Users/Pages/MyProfile'

const Profile=() =>{

const auth=useContext(AuthContext);
const userId= useParams().uid;
const [loadedProfile, setLoadedProfile] = useState();
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

const {isLoading, error, sendRequest, clearError}=useHttpClient();

const [formState,inputHandler,setFormData] =useForm({
   inputs: {
     name:{
       valid:'',
       isValid: false
     },
     status:{
       value: '',
       isValid: false
     }
   },
   isValid: false,
});

useEffect(() => {
  let Profile;

  const fetchPlace = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/myusers`,
        "GET",
        null, 
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer '+ auth.token
        }
      );
      Profile=responseData.users;
      setLoadedProfile(responseData.users);
      setFormData({
        inputs: {
          name: {
            value: Profile.name,
            isValid: true,
          },
          status: {
            value: Profile.status,
            isValid: true,
          },
        },
        isValid: true,
      });
    } catch (error) {}
  };

  fetchPlace();
}, [setFormData, sendRequest]);

const history =useHistory();
const updateSubmitHandler=async(event)=>{
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/myusers/${userId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          status: formState.inputs.status.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer '+ auth.token
        }
      );
       history.push(`/`);
    } catch (error) {}
}

if (isLoading) {
  return <LoadingSpinner asOverlay />;
}

const cancelDeleteHandler=()=>{
    setShowDeleteConfirmation(false);
}

const confirmDeleteHandler=async()=>{
    console.log('Delete');
    setShowDeleteConfirmation(false);
    try {
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/myusers/${userId}`,
        'DELETE',
        null,
        {
            Authorization: 'Bearer '+ auth.token
        }
        );
         auth.logout();
    } catch (error) {}

};
return (
  <React.Fragment>
  <ErrorModal error={error} onClear={clearError} />
  {!loadedProfile && <LoadingSpinner asOverlay />}
  <Modal  
    show={showDeleteConfirmation} 
    onCancel={cancelDeleteHandler}
    header='Are you sure'
    contentClass='place-item__modal-content'
    footerClass='place-item__modal-actions'
    footer={
        <React.Fragment>
        <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
        <Button danger onClick={confirmDeleteHandler}>Delete</Button>
        </React.Fragment>
    }>
     <p>Do you really want to delete the place?</p>
    </Modal>
  {loadedProfile && (
     <React.Fragment>
      { auth.isLoggedIn && <MyProfile uid={auth.userId}/>} 
    <form className="place-form" onSubmit={updateSubmitHandler}>
      <Input
        element="input"
        id="name"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a name"
        value={loadedProfile.name}
        isValid={true}
        onInput={inputHandler}
      />
      <Input
        id="status"
        label="Status"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid status."
        value={loadedProfile.status}
        isValid={true}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Profile
      </Button>
     </form>
     <div className='place-form'>
     <h3>Delete your profile.</h3>
     <Button danger onClick={(event)=>setShowDeleteConfirmation(true)}>Delete</Button>
     </div>
     </React.Fragment>
  )}
</React.Fragment> 
         
    )
}

export default Profile;


