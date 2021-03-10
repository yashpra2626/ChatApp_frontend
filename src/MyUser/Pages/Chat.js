import React ,{useContext}from 'react'
import {useHistory,useParams} from 'react-router-dom'
import ChatComponent from '../Components/ChatComponent'
import Input from '../../Shared/UIElements/Input'
import Button from '../../Shared/UIElements/Button'
import './Chat.css'
import {AuthContext} from '../../Shared/Context/AuthContext'
import {useHttpClient} from '../../Shared/Hooks/httpHooks'
import useForm from '../../Shared/Hooks/formHooks'
import ErrorModal from '../../Shared/UIElements/ErrorModal'
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner'
import {
    VALIDATOR_REQUIRE
  } from "../../Users/Util/validators";

 const initialState = {
    inputs: {
      message: { value: "", isValid: false },
    },
    isValid: false,
  };


const  Chat=() =>{

    const auth = useContext(AuthContext);
    const userId=useParams().uid;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(initialState);
    const submitHandler = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      
      formData.append("message", formState.inputs.message.value);
    try {
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/myusers/${userId}/chat`,
         "POST",
          formData,
         {
          Authorization: "Bearer " + auth.token,
        });
       
      } catch (err) {
        console.log(err);
      }
    };
    return (
        <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
      <ChatComponent receiverId={userId}/>
      </div>
      <form className="container" onSubmit={submitHandler}>
        <Input
          element 
          id="message"
          errorText="Please enter a valid message"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Send
        </Button>
      </form>
    </React.Fragment>
    )
}

export default Chat
