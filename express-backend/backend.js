const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');
const jwtServices = require('./models/jwt-services')
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const job = req.query['job'];
    try {
        const result = await userServices.getUsers(name, job);
        res.send({users_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});





app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   
    try {
        const result = await userServices.findUserByNameandPassword(username,password)
        console.log("Result of findUserByNameandPassword",result)
        if(result)
        {
            let token = jwtServices.generateAccessToken(username)
            res.send(token)
        }
        // const token = userServices.generateAccessToken({username: username})
        // res.json(token)
        
        // res.send({ user: result });
      } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
      }
    
});

app.post("/register", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const result = await userServices.findUserByName(username)
        console.log(result)
        if(result.length === 0)
        {
            let token = jwtServices.generateAccessToken(username)
            const user = {username: username, password: password}
            const result2 = await userServices.addUser(user)
            res.send(token)
        }
        else
        {
            res.send("Username exists already!")
        }
        
      } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
      }

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*
aaaa
r2 /R pop rdi

figure out buffer
add to it after pop rdi
bin/sh
syscall
*/