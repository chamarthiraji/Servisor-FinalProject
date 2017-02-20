const express = require('express');
const router = express.Router();
var nodemailer =require('nodemailer');
var emailDetails =require('../../emailDetails');
var serviceProviders = require('../../api/models/serviceProviders');
var Reviews = require('../../api/models/Review');

var userData = require('../../api/models/userData');
var bcrypt = require('bcryptjs');

var serviceTypeId;
var tmpDbPassword;

router.post('/sendmail',function(req,res){
	console.log("sendmail  req.body",req.body);

	// create reusable transporter object using the default SMTP transport
	 let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: emailDetails.email,
	        pass: emailDetails.pwd
	    }
	});

	// setup email data with unicode symbols
	var mailOptions = {
	    from: req.body.customerEmail, // sender address
	    to: req.body.providerEmail, // list of receivers
	    subject: req.body.subject, // Subject line
	    text: req.body.message // plain text body
	    
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    alert("message sent successfully");
	    console.log('Message %s sent: %s', 
	    	info.messageId, info.response);
	});

})

router.get('/getReviews/:userid', (req, res) => {
//  console.log("router comments get",req.params);
    var id = req.params.userid;
    id = id.replace(/ /g, '');

    serviceProviders.find({
        _id: id
    }, (err, results) => {
    	console.log("results",results);
        res.json(results);
    });
});

router.post('/reviews',function(req,res){
	console.log("/reviews req.body",req.body);
	var review=[];
	review.push(req.body.userReview) ;
	var _id = req.body.userid;
	//serviceProviders.find().populate('userDataRefId')
	serviceProviders.findById(_id, (err, serviceProviders) => {

         if(err) {
             return res.status(500).json({
                 title: `No provider was found by id: ${id}`,
                 error: err
             })
         }
         else {
         	console.log("/reviews serviceProviders.reviews:"+
         			serviceProviders.reviews);
             serviceProviders.reviews.push(req.body.userReview);
             console.log("/reviews serviceProviders.reviews 2:"+
             	review);
             serviceProviders.save(function (err, result) {
                 if(err) {
                     return res.status(500).json({
                         title: 
                         'An error occurred when uploading a comment',
                         error: err
                     })
                 }
                 console.log("result reviews",result);
                 res.json(result);
             });
         }
     });

})

router.post('/users', function(req,res){
	console.log("userdata from post 2",req.body);
	var userid=req.body.user.userid;
	var username=req.body.user.username;
	var password=req.body.user.password;
	var phonenum=req.body.user.phonenum;
	var email=req.body.user.email;
	var image=req.body.user.image;
	var about=req.body.user.about;
	console.log("userid",userid);
	console.log("password",password);

	getUserData(userid)
	.then(function(result){
		// console.log("getUserData final result",JSON.stringify(result));
		 console.log("getUserData final result 2:"+result[0]);
		if (result[0]) {
			var currentUser = req.body.user.userid;
			//var currentUser = req.body.user.username;
	 		userData.findOne({'userId': currentUser}, 
	 			'userId passWord', 
	 			function(err, user) {
					if(err) throw err;
					console.log("user password:"+
						req.body.user.password);
					console.log("db password:"+
						user.passWord);
					console.log("Data from db user:"+user);
					bcrypt.compare(req.body.user.password, 
						user.passWord, 
						function(err, result) {
							console.log("bcrypt.compare",result);
							if(result === true) {
								res.json({
									success: true,
									message: 
										"logged in successfully "
								});
							} else {
								res.json({
									success: false,
									message: "Password Incorrect "
								})
							}
						}
					);
				}
			)

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
	        			console.log("/users create result2:"+
	        				result2);
		        		res.send({inserted:true,
								dbId:result2._id,
								message:"user with userId:"+userid+
								" registered in the System"
							});
		        	}, function(err2) {
							// console.log("inside insertserviceType create err2:"+err2);
							//reject("serviceTypes function  failed:"+err);
							res.send({inserted:false,
								message:
									"Error while inserting user with userId:"+
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
