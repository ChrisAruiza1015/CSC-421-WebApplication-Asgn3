
import { useAuth } from "./context/AuthProvider";
import React,  {useState,useEffect } from 'react';
import axios from 'axios';
export const Landing = () => {
    const {value} = useAuth();
    const [userList, setUserList] = useState([]);
    
   
    useEffect(() => {
        axios.get("https://localhost:5000/users").then(response => {
            
            if(response)
            {
              setUserList(response.data)
            }    
        });
     },[])
    
    return (
      
        <div className = "DisplayUsers">
         <>
          <h2>Landing (Protected)</h2>
          <div> Authenticated as {value.token}</div>
        </>
        <h1>User List:</h1>
        {Array.isArray(userList.userList) && userList.userList.map((user,idx) => <li key={idx}>{user.username}</li>)}
        </div>
    );
  };