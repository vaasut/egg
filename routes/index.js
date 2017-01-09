var express = require('express');
var router = express.Router();



var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Local Egg' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'The Local Egg' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'The Local Egg' });

	});

  var validate = function(req,res){
  	
	if (!!(req.body.name) === false){
		return "Please Enter Your Name"
	}

	if (!!(req.body.email) === false){
		//res.render("new", {errors: "Goal must be number > 0"});
		return "Please Enter Your Email";
	}

	else if (!!(req.body.phone) ===false){
		//Error
		//res.render("new", {errors: "Final Date must be after Start Date"}); 
		return "Please Enter Your Phone Number"
		}

	}	

router.post("/contact", function(req,res) {
	console.log("ummmm")
  	console.log(req.body)
	var errors = validate(req);
	var cont_name = "Name: " + req.body.name 
	var cont_email = "Email: " + req.body.email 
	var cont_phone ="Phone Number: " + req.body.phone  
	var cont_comments = "Comments: " + req.body.comments 
	var request_contact = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: {
	    personalizations: [
	      {
	        to: [
	          {
	            email: 'vtaneja@middlebury.edu',
	          },
	        ],
	        subject: 'Contact Info',
	      },
	    ],
	    from: {
	      email: 'vaasut1@gmail.com',
	    },
	    content: [
	      {
	        type: 'text/html',
	        value: "<html>" + cont_name + "<br>" + cont_email + "<br>" + cont_phone + "<br>" + cont_comments + "</html>",
	      },
	    ],
	  },
	});

	if (errors) {
		res.render("contact", {
			errors: errors,
			})
		}
	else {

		//With callback
		sg.API(request_contact, function(error, response) {
		  if (error) {
		    console.log('Error response received');
		  }
		  console.log(response.statusCode);
		  console.log(response.body);
		  console.log(response.headers);
		});


		console.log("um")
		// var c = new models.contact ({
		// 	name: req.body.name,
		// 	email: req.body.email,
		// 	phone: req.body.phone,
		// 	comments: req.body.comments,
		// });

		// c.save(function(error, contact){
		// 	if (error){
		// 		res.status(400).send("Error creating contact: " + contact)
		// 	}
		// 	else{
		// 		res.redirect("/")
		// 	}

		// })
		res.redirect("/")
	}
})

router.get('/apply', function(req, res, next) {
  res.render('apply', { title: 'The Local Egg' });

	});

router.post("/apply", function(req,res) {
	console.log("ugh")
  	console.log(req.body)
	var errors = false
	var app_name = "Name: " + req.body.name
	var app_city = "City: " + req.body.city
	var app_state =" State: " + req.body.state 
	var app_zip = "Zip Code: " + req.body.zip
	var app_phone = "Phone: " + req.body.phone
	var app_email = "Email: " + req.body.email 
	var app_age = "Age/Grade: " + req.body.age
	var app_school = "School" + req.body.school
	var app_refer =    "Referred by: " + req.body.refer
	var app_desc = "Please provide a description of your request, need and timing. " + req.body.desc
	var app_less = "What are your educational interests and goals? " + req.body.less
	var app_proud =	"Of what accomplishment are you most proud? " + req.body.proud
	var app_see = "How do you see these funds making a difference in your life? " + req.body.see
	var app_hear= "How did you hear about the The Local Egg Foundation? " + req.body.hear
	var app_have= "Have you requested funds for this need elsewhere? If yes, where? " + req.body.have
	var app_add= "Is there any additional information you would like us to consider? " + req.body.add
	var app_guide = "Guidance Counselor: Name and Contact Information " + req.body.guide
	var app_work = "Work / Extracurricular Reference: Name and Contact Information" + req.body.work
	var app_sign = "Signature: " + req.body.sign
	var app_date = "Date " + req.body.date


	var applicant_contact = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: {
	    personalizations: [
	      {
	        to: [
	          {
	            email: 'vtaneja@middlebury.edu',
	          },
	        ],
	        subject: 'Applicant Info',
	      },
	    ],
	    from: {
	      email: 'vaasut1@gmail.com',
	    },
	    content: [
	      {
	        type: 'text/html',
	        value: "<html>" + app_name + "<br>" + app_city + "<br>" + app_state + "<br>" 
	        + app_zip + "<br>" + app_phone + "<br>" + app_email + "<br>" + app_age + "<br>" + app_school +
	        "<br>" + app_refer + "<br>" + app_desc + "<br>" + app_less + "<br>" + app_proud + "<br>" + app_see +
	        "<br>" + app_hear + "<br>" + app_have + "<br>" + app_add + "<br>" + app_guide + "<br>" + app_work + 
	        "<br>" + app_sign + "<br>" + app_date + "</html>",
	      },
	    ],
	  },
	});


	if (errors) {
		res.render("apply", {
			errors: errors,
			})
		}
	else {

		sg.API(applicant_contact, function(error, response) {
		  if (error) {
		    console.log('Error response received');
		  }
		  console.log(response.statusCode);
		  console.log(response.body);
		  console.log(response.headers);
		});


		console.log("qwerty")
		// var a = new models.apply ({
		// 	name: req.body.name,
		// 	city: req.body.city,
		// 	state: req.body.state,
		// 	zip: req.body.zip,
		// 	email: req.body.email,
		// 	phone: req.body.phone,
		// 	refer: req.body.refer,
		// 	age: req.body.age,
		// 	less: req.body.less,
		// 	desc: req.body.req,
		// 	see: req.body.see,
		// 	hear: req.body.hear,
		// 	have: req.body.have,
		// 	comments: req.body.comments,
		// });

		// a.save(function(error, apply){
		// 	if (error){
		// 		res.status(400).send("Error creating contact: " + apply)
		// 	}
		// 	else{
		// 		res.redirect("/")
		// 	}

		// })
		res.redirect("/")
	}
})


module.exports = router;

// var models = require("../model/contact.js", function(req,res){

// });

