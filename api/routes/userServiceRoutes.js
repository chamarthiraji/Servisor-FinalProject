const express = require('express');
const router = express.Router();

var serviceTypes = require('../../api/models/serviceTypes');
var serviceProviders = require('../../api/models/serviceProviders');
var userData = require('../../api/models/userData');
var bcrypt = require('bcryptjs');

//var {ObjectId} = require('mongodb'); // or ObjectID

var serviceTypeId;
var tmpDbPassword;

router.post('/users', function(req,res){
	// console.log("userdata from post 2",req.body);
	var userid=req.body.user.userid;
	var username=req.body.user.username;
	var password=req.body.user.password;
	var phonenum=req.body.user.phonenum;
	var email=req.body.user.email;
	var image=req.body.user.image;
	var about=req.body.user.about;

	getUserData(userid)
	.then(function(result){
		// console.log("getUserData final result",JSON.stringify(result));
		// console.log("getUserData final result 2:"+result[0]);
		if (result[0]) {
			// console.log("user with userId:"+userid+
				// ", already exists - db userid:"+result[0].userId);
			// res.send({inserted:false,
			// 	message:"user with userId:"+userid+
			// 	", already exists.. try to register with another user id"});

				var currentUser = req.body.user.username;
		 		userData.findOne({'userName': currentUser}, 'userName passWord', function(err, user) {
					if(err) throw err;
						bcrypt.compare(req.body.user.password, user.passWord, function(err, result) {
							console.log(result)
							if(result === true) {
									res.json({
										success: true,
								});
							} else {
								res.json({
									success: false
								})
							}
					});

				})

		} else {
			bcrypt.genSalt(10, function(err, salt) {
    			bcrypt.hash(password, salt, 
    			function(err, hash) {
		        	userData.create({
		        		userId:userid,
						userName:username,
						passWord:hash,
						phoneNo:phonenum,
						email:email,
						image:image,
						about:about
	        		}).then(function(result2) {
		        		res.send({inserted:true,
								dbId:result2._id,
								message:"user with userId:"+userid+
								" registered in the system"
							});
		        	}, function(err2) {
							// console.log("inside insertserviceType create err2:"+err2);
							//reject("serviceTypes function  failed:"+err);
							res.send({inserted:false,
								message:"Error while inserting user with userId:"+
								userid+",  err2:"+err2
							});
					}); 
    			});
			});
		}
		// end of getUserData.then				
	},
	function(err3) {
		console.log("inside /users getUserData  err3:"+err3);
				//reject("serviceTypes function  failed:"+err);
	});

});// end of users

// function findExistingUser() {
// 	router.get('/existingUser/:username', function(req, res) {
// 		var currentUser = req.params.username;
// 		userData.findOne({'userName': currentUser}, 'userName passWord', function(err, user) {
// 			console.log(user);
// 			if(err) throw err;
// 			res.send({'pass': user.passWord})
// 		})
// 	})
// }


//inserting data into "serviceProviders" Schema
router.post('/serviceproviders',function(req,res){
	console.log("serviceproviders 2 req.body",req.body);
	var tmpServiceName = req.body.services.serviceType;
	var tmpSpecializationName = req.body.services.specializationName;
	var tmpUserData2_id = req.body.services.userDataRefId;

	serviceProviders.create({
		serviceName:tmpServiceName,
		userDataRefId:tmpUserData2_id,
		specializationName:tmpSpecializationName,
		rating:"high"
	}).then(function(result2) {
		console.log("/serviceproviders result2:"+result2);
    	res.send(result2);
	}, function(err2) {
		console.log("/serviceproviders err2:"+err2);
		res.send(err2);

	}); 

});

function getUserData(useridParam){
	console.log("inside getUserData useridParam:"+useridParam);

	return new Promise( function( resolve, reject ) {

		userData.find({
			userId:useridParam
		}).then(function(result){
			// console.log("getUserData result",JSON.stringify(result));
			resolve(result);

		}), function(err2) {
			// console.log("inside getUserData  err2:"+err2);
			reject("getUserData failed");
		};

	});

} // end of - function getUserData

//getting data from serviceproviders collection
//router.get('/providers/:serviceName',function(req,res){
router.post('/providers',function(req,res){
	console.log("providers req.body",req.body);
	//console.log("router get",req.params);
    //var serviceName = req.params.serviceName.toLowerCase();
	//serviceName = serviceName.replace(/ /g, '');

	//console.log("serviceName:"+serviceName);
	console.log("serviceName:", req.body.serviceName);
	var tempSearchOptions = {};
	tempSearchOptions["path"]="userDataRefId";
	var tmpServiceProviderFilters = {};

	if (req.body.serviceName) {
		console.log("inside serviceName");
		tmpServiceProviderFilters["serviceName"] = 
			req.body.serviceName.toLowerCase()	;
	}

	if (req.body.specializationName) {
		console.log("inside specializationName");
		tmpServiceProviderFilters["specializationName"] =
			req.body.specializationName.toLowerCase();
	}

	if (req.body.userId) {
		console.log("inside userId");
		tempSearchOptions["match"]={userid:
			req.body.userId.toLowerCase()};
	}

	// this work s fine
	// tempSearchOptions["match"]={userId:"raji"};
	//tempSearchOptions["match"]={ _id: "588e6ab3868755085c388cab"};

	console.log("tempSearchOptions:"+tempSearchOptions);
	console.log("tempSearchOptions json:"+
			JSON.stringify(tempSearchOptions));
	//serviceProviders.find().populate('userDataRefId')
	serviceProviders.find(tmpServiceProviderFilters).populate(tempSearchOptions)
	.exec(function(error, serviceProviderResults) {
		if (error) {
			console.log("/providers/:serviceName error:"+error);
		}
		// Otherwise, send the doc to the browser as a json object
		else {
			console.log(" /providers/:serviceName serviceProviderResults:"+serviceProviderResults);
			res.json(serviceProviderResults);
		}
	});
});

module.exports = router;
