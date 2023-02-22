
import axios from 'axios'

export const Signup = () =>{
    let passwordChecker = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]+)')

    async function setData(e)
    {   
        e.preventDefault();
        const form = document.getElementById("signup")
        const username = form.elements["username"].value
        const password = form.elements["password"].value
        const second_password = form.elements["second_password"].value
        const user = {username: username, password: password}
        if(username === '' || password === '' || second_password === '')
        {
            alert("One or more fields are empty")
        }
        if(!passwordChecker.test(password))
        {
            alert("Password must contain at least one capital letter,one number, and one symbol!")
        }
        else
        {
            if(password === second_password)
            {
                try {
                    const response = await axios.post('http://localhost:5000/register', user);
                    if(response.data === "Username exists already!")
                    {
                        alert(response.data)
                    }
                    else if(response.data)
                    {
                        alert("Signed up!")
                    }
                    else
                    {
                        alert("Something went wrong!")
                    }
                    
                 }
                 catch (error) {
                    console.log(error);
                    return false;
                 }
            }
            else
            {
                alert("The password's do not match!")
            }
        }
        
       
    }

    return (
        <div className = "home">
        <h2>Signup</h2>
        <form onSubmit={setData} id = "signup">
                <label htmlFor="username">username</label>
                    <input
                        id= "username"
                        name="username"
                        type="text"
                        />
                
                <label htmlFor="password"> password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        />
                
                <label htmlFor ="second_password"> re-enter password</label>
                    <input
                        id="second_password"
                        name="second_password"
                        type="password"
                        />
                    <br></br>


                <input value="Sign Up" type="submit"/>
                
            </form>
        </div>
    );
};