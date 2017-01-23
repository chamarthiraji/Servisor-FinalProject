//Require mongoose
var mongoose = require("mongoose");
//Create Schema class
var Schema = mongoose.Schema;


var userDataSchema = new Schema({
    userId:{
    	type:String    	
	},
    passWord:{
        type:String     
    },
    userName:{
        type:String     
    },
    phoneNo :{
		type:String
		
	},
    email:{
        type:String
    },
    about:{
       type:String 
    },
    image:{
        type:String
    }   
  
});

//here we are creating serviceProviders model using serviceProvidersSchema schema
var userData = mongoose.model("userData", userDataSchema);

// Export the model
module.exports = userData;
