const express = require('express');
const router = express.Router();

var serviceTypes = require('../../api/models/serviceTypes');
var specializationData = require('../../api/models/specializationData');
var serviceProviders = require('../../api/models/serviceProviders');
var userData = require('../../api/models/userData');

//var ObjectID = require('mongodb').ObjectID; // convert string to ObjectID

var serviceTypeId;

router.post('/users',function(req,res){
	console.log("userdata from post",req.body);
	var userid=req.body.user.userid;
	var username=req.body.user.username;
	var password=req.body.user.password;
	var phonenum=req.body.user.phonenum;
	var email=req.body.user.email;
	var image=req.body.user.image;
	var about=req.body.user.about;

	userData.create({
		userId:userid,
		userName:username,
		password:password,
		phoneNo:phonenum,
		email:email,
		image:image,
		about:about
	}).then(function(result){
		console.log("db result",result);
	}), function(err2) {
				console.log("inside insertserviceType create err2:"+err2);
				//reject("serviceTypes function  failed:"+err);
			}; // e


})

router.get('/insertserviceType/:serviceName', 
	(req, res) => {
	// 	http://localhost:3000/api/insertserviceType/food
	// 	http://localhost:3000/api/insertserviceType/tutoring

	console.log("inside insertserviceType params:"+
		JSON.stringify(req.params));
	var tmpserviceName = req.params.serviceName.toLowerCase();

	serviceTypes.create({
				serviceName:tmpserviceName
			}).then(function(results2){
		              console.log('POST created  ' +results2);
					  res.json(results2);
					  //res.json(results2);
		          // end of - specializationData.create then
			}, function(err2) {
				console.log("inside insertserviceType create err2:"+err2);
				//reject("serviceTypes function  failed:"+err);
			}); // end of - err - specializationData.create

});

router.get('/serviceType/:serviceName', (req, res) => {
	// http://localhost:3000/api/serviceType/tutoring
	// this will just return id of the service name
	// my not be useful unless we need in the front end
	console.log("inside /serviceType/:serviceName params:"+
		JSON.stringify(req.params));
	let tmpserviceName = req.params.serviceName.toLowerCase();
	tmpserviceName = tmpserviceName.replace(/ /g, '');

	serviceTypes.find({
		//serviceName:"tutoring"
		serviceName:tmpserviceName
	}, (err, results) => {
		console.log("inside to get data from serviceTypes err:"+err);
		console.log("serviceTypes results:"+JSON.stringify(results));
		res.json(results);
	});
});

router.get('/getSpecializations/:serviceName', (req, res) => {
	// http://localhost:3000/api/getSpecializations/tutoring
	console.log("inside /serviceType/:serviceName params:"+
		JSON.stringify(req.params));
	let tmpserviceName = req.params.serviceName.toLowerCase();
	tmpserviceName = tmpserviceName.replace(/ /g, '');
	var tmp;
	// new Promise(function(resolve, reject) {
	serviceTypes.find({
		//serviceName:"tutoring"
		serviceName:tmpserviceName
	}).then(function(results){
		console.log("serviceTypes results:"+JSON.stringify(results));
		tmp = results;
		
		specializationData.find({
				//serviceName:"tutoring"
				servicetype_id : tmp[0]._id
		}).then(function(results2){
			tmp = JSON.stringify(results2);
			console.log("specializationData results:"+
				JSON.stringify(results2));
			res.json(results2);
			// res.json(JSON.stringify(results2));
		}, function(err2) {
			console.log("inside to get specializationData err2:"+
				err2);
			//reject("specializationData function  failed:"+err2);
		});
		console.log("tmp:"+tmp);
		//res.json(tmp);
		
		// end of - serviceTypes.find then
	}, function(err) {
			console.log("inside serviceTypes err:"+err);
			//reject("serviceTypes function  failed:"+err);
	}); // end of err - serviceTypes.find
//});
});



router.get('/insertSplData/:serviceName/:specializationName', 
	(req, res) => {
	// 	http://localhost:3000/api/insertSplData/tutoring/math
	// 	http://localhost:3000/api/insertSplData/tutoring/english
	// 	http://localhost:3000/api/insertSplData/tutoring/arts
	// 	http://localhost:3000/api/insertSplData/tutoring/music
	// 	http://localhost:3000/api/insertSplData/tutoring/social
	console.log("inside insertSplData params:"+
		JSON.stringify(req.params));
	let tmpserviceName = req.params.serviceName.toLowerCase();
	tmpserviceName = tmpserviceName.replace(/ /g, '');
	let tmpSpecializationName = req.params.specializationName.toLowerCase();

	serviceTypes.find({
		//serviceName:"tutoring"
		serviceName:tmpserviceName
	}).then(function(results){
		console.log("serviceTypes results:"+JSON.stringify(results[0]._id));

	//	var safeObjectId = s => ObjectId.isValid() ? new ObjectId(s) : null;
		specializationData.create({
	        servicetype_id : results[0]._id,
	        name : tmpSpecializationName,
	        details : "hello"
		}).then(function(results2){
	              console.log('POST created  ' +results2);
				  res.json(results2);
				  //res.json(results2);
	          // end of - specializationData.create then
		}, function(err2) {
			console.log("inside specializationData create err2:"+err2);
			//reject("serviceTypes function  failed:"+err);
		}); // end of - err - specializationData.create

		//end of - serviceTypes.find then
	}, function(err) {
			console.log("inside serviceTypes err:"+err);
			//reject("serviceTypes function  failed:"+err);
	}); // end of - err - serviceTypes.find
});

module.exports = router;
