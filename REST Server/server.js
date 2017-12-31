var express 	= require('express');
var bodyParser 	= require('body-parser');
var app 		= express();
var router 		= express.Router();
var port 		= process.env.PORT || 3000;

//setting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/apiusers');

var User 		= require('./models/user');
var Mahasiswa 	= require('./models/mahasiswa');
console.log(Mahasiswa);
//middleware
router.use(function (req, res, next) {
	console.log('middleware berjalan pada : ' + Date.now());
	next();
});

//bodyparser
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

//routing
router.get('/', function (req, res) {
	res.json({message : "anda di home"});
});

router.route('/mahasiswa').post(function (req, res) {
	
	var mhs = new Mahasiswa();
	mhs.nama 		= req.body.nama;
	mhs.jurusan 	= req.body.jurusan;
	mhs.semester 	= req.body.semester;

	mhs.save(function (err) {
		if (err) {
			res.send(err);
		}else{
			res.json('Berhasil ditambahkan');
		}
	});

}).get(function (req, res) {
	Mahasiswa.find(function (err, maha) {
		if (err) res.send(err);
		res.json(maha);
	});
});

router.route('/mahasiswa/:id').get(function (req, res) {
	Mahasiswa.find({_id:req.params.id}, function (err, maha) {
		if (err) res.send(err);
		res.json(maha);
	});
}).put(function (req, res) {
	Mahasiswa.update(
		{_id:req.params.id},
		{nama:req.body.nama},
		function (err, maha) {
			if (err) res.send(err);
			res.json(maha);
		});
}).delete(function (req, res) {
	User.remove(
		{name:req.params.name},
		function (err, user) {
			if (err) res.send(err);
			res.json({message : "berhasil dihapus"});
		});
});

router.route('/users').post(function (req, res) {
	
	var user = new User();
	user.name = req.body.name;
	user.password = req.body.password;

	user.save(function (err) {
		if (err) {
			res.send(err);
		}else{
			res.json({message : "user berhasil ditambah"});
		}
	});

}).get(function (req, res) {
	User.find(function (err, users) {
		if (err) res.send(err);
		res.json(users);
	});
});

router.route('/users/:name').get(function (req, res) {
	User.find({name:req.params.name}, function (err, user) {
		if (err) res.send(err);
		res.json(user);
	});
}).put(function (req, res) {
	User.update(
		{name:req.params.name},
		{name:req.body.name}, 
		function (err, user) {
			if (err) res.send(err);
			res.json(user);
		});
}).delete(function (req, res) {
	User.remove(
		{name:req.params.name},
		function (err, user) {
			if (err) res.send(err);
			res.json({message : "berhasil dihapus"});
		});
});

//endpoint
app.use('/api',router);

app.listen(port);
console.log('anda di port ' + port);
