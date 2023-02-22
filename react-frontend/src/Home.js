import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { useAuth } from "./context/AuthProvider";


export const Home = () => {
    const { value } = useAuth();
    value.setToken(getToken())

    async function validateUser(e)
    {   
        e.preventDefault();
        const form = document.getElementById("signin")
        const username = form.elements["username"].value
        const password = form.elements["password"].value
        const user = {username: username, password: password}
        try {
            const response = await axios.post('http://localhost:5000/login',  user);
            console.log("response.data",response.data)
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
        var nameEQ = "token=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            
            while (c.charAt(0) === ' '){
                c = c.substring(1,c.length);
            }
            
            if (c.indexOf(nameEQ) === 0){
                return c.substring(nameEQ.length,c.length);
            }
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
    