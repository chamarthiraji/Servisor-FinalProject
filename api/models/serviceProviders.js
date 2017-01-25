//Require mongoose
var mongoose = require("mongoose");
//Create Schema class
var Schema = mongoose.Schema;


var serviceProvidersSchema = new Schema({
    
    serviceName:{
            type:String
        
    },
    specializationName:{
        type:String
    },
    user_id :{
        type:Schema.Types.ObjectId,
        ref:"userData"
        
    },
    rating: {
    	type:"string"

    }
  
});

//here we are creating serviceProviders model using serviceProvidersSchema schema
var serviceProviders = mongoose.model("serviceProviders", serviceProvidersSchema);

// Export the model
module.exports = serviceProviders;
