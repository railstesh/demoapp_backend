var express = require('express');
var app = express();
var registration= require('./model');
var bodyParser = require('body-parser'); 
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
var cors = require('cors')
app.use(cors())


app.get('/', function(req, res){
   res.send("Hello world!");
});
app.get("/users",function(req, res){   
   Person.find({}, function(err, data){  
      if(err){  
         res.json(err);  
      }  
      else{        
         res.json(data);  
      }  
   });  
})  
app.post('/registration',function(req,res){
  var registrationInfo = req.body;
  console.log('registrationInfo =', registrationInfo)
  var newRegister = new registration({
     name:registrationInfo.name,
     phone_Number:registrationInfo.phoneNumber,
     address: registrationInfo.address,
     email:registrationInfo.email,
     password:registrationInfo.password,
     dateOfBirth:registrationInfo.dateOfBirth,
     securityQuestion:registrationInfo.securityQuestion,
  });
   return newRegister.save().then(response => {
      
      res.json({ status: 200, user: response});
   }, (err) => {
      console.log('err = ', err)
      res.json({ status: 500, error: err });
   });
})
app.post('/login',function(req, res){
   email=req.body.email;
   password=req.body.password;
   console.log('email = ', email);
  
   registration.findOne({ email:req.body.email ,password:req.body.password},
      function(err,data){
         if(data===null){
         res.json("incorrect email");
         }else{
            if( data.email===req.body.email && data.password===req.body.password) {
               res.json(data);
               }
            else{
               res.json();
               }
            }
      }
   )
})


app.listen(3001);