const express = require('express');
const router = express.Router();

var serviceTypes = require('../../api/models/serviceTypes');
var specializationData = require('../../api/models/specializationData');
var serviceProviders = require('../../api/models/serviceProviders');
var userData = require('../../api/models/userData');

//var ObjectID = require('mongodb').ObjectID; // convert string to ObjectID

var serviceTypeId;
var tmpDbPassword;

//inserting data into "userData" schema
router.post('/users',function(req,res){
	console.log("userdata from post 2",req.body);
	var userid=req.body.user.userid;
	var username=req.body.user.username;
	var password=req.body.user.password;
	var phonenum=req.body.user.phonenum;
	var email=req.body.user.email;
	var image=req.body.user.image;
	var about=req.body.user.about;

	getUserData(userid)
	.then(function(result){
		console.log("getUserData final result",JSON.stringify(result));
		console.log("getUserData final result 2:"+result[0]);
		if (result[0]) {
			console.log("user with userId:"+userid+
				", already exists - db userid:"+result[0].userId);
			res.send({inserted:false,
				message:"user with userId:"+userid+
				", already exists.. try to register with another user id"});
		} else {
			console.log("getUserData tmp");
			userData.create({
				userId:userid,
				userName:username,
				passWord:password,
				phoneNo:phonenum,
				email:email,
				image:image,
				about:about
			}).then(function(result2){
				console.log("db result 2 ",JSON.stringify(result2));
				res.send({inserted:true,
						dbId:result2._id,
					message:"user with userId:"+userid+
					" registered in the system"});
		

			}, function(err2) {
				console.log("inside insertserviceType create err2:"+err2);
						//reject("serviceTypes function  failed:"+err);
				res.send({inserted:false,
					message:"Error while inserting user with userId:"+
					userid+",  err2:"+err2});
		
			}); // e
		}

	}, function(err3) {
		console.log("inside /users getUserData  err3:"+err3);
				//reject("serviceTypes function  failed:"+err);
	});

	console.log("hello end from /users");

});

//inserting data into "serviceProviders" Schema
router.post('/serviceproviders',function(req,res){
	console.log("serviceproviders req.body",req.body);
	var serviceName = req.body.services.serviceType;
	var specializationName = req.body.services.specializationName;
	var user_id = req.body.services.user_id;
	serviceProviders.create({
		serviceName:serviceName,
		specializationName:specializationName,
		user_id:user_id
	});
});



function getUserData(useridParam){
	console.log("inside getUserData useridParam:"+useridParam);

	return new Promise( function( resolve, reject ) {
		
		userData.find({
			userId:useridParam
		}).then(function(result){
			console.log("getUserData result",JSON.stringify(result));
			// tmpDbPassword = 
			resolve(result);

		}), function(err2) {
			console.log("inside getUserData  err2:"+err2);
					//reject("serviceTypes function  failed:"+err);
			reject("getUserData failed");
		};

	});

} // end of - function getUserData

module.exports = router;
