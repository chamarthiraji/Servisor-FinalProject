//Require mongoose
var mongoose = require("mongoose");
//Create Schema class
var Schema = mongoose.Schema;

var specializationDataSchema = new Schema({

	servicetype_id :{
    	type:Schema.Types.ObjectId,
    	ref:"serviceTypes"
	},
    name : {
    	type:String
    },
    details :{
    	type:String
    } 
  
});

//here we are creating serviceTypes model using serviceTypesSchema schema
var specializationData = mongoose.model("specializationData", specializationDataSchema);

// Export the model
module.exports = specializationData;
