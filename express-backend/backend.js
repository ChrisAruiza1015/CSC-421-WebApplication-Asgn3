const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userServices = require('./models/user-services');
const jwtServices = require('./models/jwt-services')
const app = express();
const port = 5000;
const https = require("https");
const fs = require("fs");
const bcrypt = require("bcrypt")
app.use(cors());
app.use(express.limit('2mb'));
app.use(helmet());
app.use(express.json());
const saltRounds = 10;

https
  .createServer(  {
    key: fs.readFileSync("../react-frontend/reactcert/key.pem"),
    cert: fs.readFileSync("../react-frontend/reactcert/cert.pem"),
  },app)
  .listen(port, ()=>{
    console.log(`Example app listening at https://localhost:${port}`)
  });



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    
    try {
        const result = await userServices.getUsers();
        userList = result.map(user =>{
          return {username: user.username}
        })
        res.send({userList: userList});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});





app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   
    try {
        const user = await userServices.findUserByName(username)
        if(user)
        {
          if(await bcrypt.compare(password,user.password))
          {
            let token = jwtServices.generateAccessToken(username)
            res.send(token)
          }
          else
          {
            res.send(null)
          }
            
        }
        else{ res.send(null)}
       
      } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
      }
    
});

app.post("/register", async (req,res) => {
    const username = req.body.username;
    const plainTextPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainTextPassword,salt);

    try {
        
        const result = await userServices.findUserByName(username)
       
        if(result === null || result.length == 0)
        {
            let token = jwtServices.generateAccessToken(username)
            const user = {username: username, password: password}
            await userServices.addUser(user)
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



/*
aaaa
r2 /R pop rdi

figure out buffer
add to it after pop rdi
bin/sh
syscall
*/