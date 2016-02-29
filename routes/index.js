var express = require('express');
var router = express.Router();
var fs = require('fs');
var omDB = require('../external/onlineMentoringDB');


/* GET home page. */

router.get('/', function (req, res) {
	fs.readFile("data/questions.json", "utf8", function(error, text) {
  		if (error)
    		throw error;

    	var questionsData = JSON.parse(text);
    	omDB.doQuery(function(err,res){
    		console.log(res);
    	});
    	res.render('index', {title: 'Mentoring', questionsData: questionsData});
	});
});

router.post('/', function(req, res) {

	var formData = req.body; 
	var role = "";

	if(formData.role == 'Mentor'){
		role = "Mentors";
		// omDB.registerMentor(formData);
	} else if(formData.role == 'Mentee'){
		role = "Mentees";
		// omDB.registerMentee(formData);
	}

	omDB.registerUser(formData,role);
	console.log(formData);

	
	// if err <= VALIDATE THE FORM
	// res.render index {asdasd asdasd asdas}
	// else
	// res.render success.ejs
	// 
	// create new user...
	// 
	// 

	return res.send(req.body);
});

router.get('/pair',function(req,res){
	res.render('pair',{title:'Pair'});
});



module.exports = router;
