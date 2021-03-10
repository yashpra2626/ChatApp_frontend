import React, { useState,useEffect ,useContext} from 'react';
import Pusher from 'pusher-js';
import './ChatComponent.css'
import {useHttpClient} from '../../Shared/Hooks/httpHooks'
import {AuthContext} from '../../Shared/Context/AuthContext'
const  ChatComponent=({receiverId})=> {
   const auth= useContext(AuthContext);
   const [messages,setMessages]=useState([]);
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   useEffect(() => {
      const fetchMessage = async()=>{
        try {
    
          const responseData=  await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/myusers/${receiverId}/chat`,
             "GET",
              null,
             {
              Authorization: "Bearer " + auth.token,
            });
              setMessages(responseData.chats);
          } catch (err) {
            console.log(err);
          }
      }
      fetchMessage();
    
   }, [messages])

  //  useEffect(() => {
  //   const  pusher = new Pusher('951df5bf123c0460974d', {
  //     cluster: 'ap2'
  //   });

  //   const channel = pusher.subscribe('messages');
  //   channel.bind('inserted', function(data) {
  //     alert(JSON.stringify(data));
  //   });
  //    return () => {
  //      channel.unbind_all();
  //      channel.unsubscribe();
  //    }
  //  }, [messages])

    return(
      
        messages.map(m=>
         (<div className={`container ${(m.creatorId._id===receiverId) && 'darker'}`}>
          <img src={`${process.env.REACT_APP_ASSET_URL}/${m.creatorId.image}`} 
            className={` ${(m.creatorId._id!==receiverId) && 'right'}`} />
          <p>{m.message}</p>
          </div>)
          )
        

      //  <div className="container darker">
      //  <img src='https://d36tnp772eyphs.cloudfront.net/blogs/1/2019/09/Taj-Mahal.jpg' />
      //  <p>Hey! I'm fine. Thanks for asking!</p>
      //  </div>

      
       
     )
};

export default ChatComponent

