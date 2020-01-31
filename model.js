var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demodb',{
  useNewUrlParser: true ,
  useUnifiedTopology: true 

});
var userRegistration = mongoose.Schema({
  name:String,
  phone_Number: { type: Number, unique: true},
  address: String,
  email:{ type: String,unique: true},
  password:{ type: String,unique: true},
  dateOfBirth: String,
  securityQuestion:String,

  
});
var registration = mongoose.model("registration",userRegistration);

module.exports = registration;
