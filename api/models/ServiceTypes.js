//Require mongoose
var mongoose = require("mongoose");
//Create Schema class
var Schema = mongoose.Schema;


var serviceTypesSchema = new Schema({

	serviceName: {
		type:String,
		required: true
	}
  
});

//here we are creating serviceTypes model using serviceTypesSchema schema
var serviceTypes = mongoose.model("serviceTypes", serviceTypesSchema);

// Export the model
module.exports = serviceTypes;
