const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const { exec } = require("child_process")
const fs = require('fs');
app.use(bodyParser.urlencoded())

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
     
    const data = `${username},${password}\n`;

    if(username && password){
         fs.appendFile('users.txt',data,function(err){
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            res.status(200).send("Succesfully added to file");
        }
    })
    }
   
});


app.get('/runProgram', (req, res) => {
    exec("node loginAutomation.js", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    res.send('Program running');
  });

app.listen(3000,function(){
    console.log("server started on port 3000")
});



