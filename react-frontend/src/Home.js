import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from "./context/AuthProvider";
import React,  {useEffect} from 'react';

export const Home = () => {
    
    const { value } = useAuth();
    
    
     useEffect(() => {
        
        
        value.setToken(getToken())    
        
     },[])

    async function validateUser(e)
    {   
        e.preventDefault();
        const form = document.getElementById("signin")
        const username = form.elements["username"].value
        const password = form.elements["password"].value
        const user = {username: username, password: password}
        try {
            const response = await axios.post('https://localhost:5000/login',  user);
            if(response.data)
            {
                alert("Logged in!")
                value.onLogin(response.data)
                
            }
            else
            {
                alert("User not found or password incorrect")
            }

         }
         catch (error) {
            console.log(error);
            return false;
         }
       
    }
    function getToken() {
        
        var cookies = document.cookie.split(';');
        var token_string = cookies.find(element => element.includes("token="))
  
        if(token_string)
        {
            var token_value = token_string.split("=")[1]
            return token_value
        }
        
        return null;
    }

    return (
        
        <div className = "home">
        <h2>Home (Public)</h2>
            <form onSubmit={validateUser} id = "signin">
                <label>
                    username
                    <input
                        name="username"
                        type="text"
                        
                        />
                </label>
                <label>
                    password
                    <input
                        name="password"
                        type="password"
                        
                        />
                </label>
                <label>
                     <input value="Sign In" type="submit"/>
                </label>
               

            </form>
            <h3>Don't have an Account?<NavLink to="/Signup">Sign Up!</NavLink></h3>
        </div>
    );
};
    