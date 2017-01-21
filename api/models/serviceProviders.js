//Require mongoose
var mongoose = require("mongoose");
//Create Schema class
var Schema = mongoose.Schema;


var serviceProvidersSchema = new Schema({
    
    specialization_data_id :{
        type: Schema.Types.ObjectId,
        ref:"specializationData"
    },
    user_id :{
		type:String
		
	},
    rating: {
    	type:"string"

    }
  
});

//here we are creating serviceProviders model using serviceProvidersSchema schema
var serviceProviders = mongoose.model("serviceProviders", serviceProvidersSchema);

// Export the model
module.exports = serviceProviders;
