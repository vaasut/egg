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
	var contact_info = "Name: " + req.body.name + "---    Email: " + req.body.email + "---    Phone Number: " + req.body.phone + "---   Comments: " + req.body.comments 
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
	        type: 'text/plain',
	        value: contact_info,
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
	var applicant_info = "Name: " + req.body.name + 
	"---    City: " + req.body.city + 
	"---    State: " + req.body.state + "---   Zip Code: " + req.body.zip + "--- Email: " + req.body.email 
	// +"---    Phone: " + req.body.phone + "---    Referred by: " + req.body.refer + "---    Age/Grade: " + req.body.age +
	// "---    Please provide a description of your request, need and timing: " + req.body.less +
	// "Provide a brief description of your request, need and timing: " + req.body.desc +
	// "----   How do you see these funds making a difference in your life?" + req.body.see + 
	// "----   How did you hear about the The Local Egg Foundation?" + req.body.hear +
	// "---- Have you requested funds for this need elsewhere? If yes, where?" + req.body.have + 
	// "--- Signature" + req.body.sign + "---Date" + req.body.date

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
	        type: 'text/plain',
	        value: "<html>" + applicant_info + "<br> <p> Hello World!" + "</html>",
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

