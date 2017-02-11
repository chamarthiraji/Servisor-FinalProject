//Require mongoose
var mongoose = require("mongoose");
//Create Schema class
var Schema = mongoose.Schema;

var reviewSchema = new Schema({

	reviews: {
		type:Array		
	}
  
});

//here we are creating serviceTypes model using serviceTypesSchema schema
var Review = mongoose.model("Review", reviewSchema);

// Export the model
module.exports = Review;
