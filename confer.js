require('dotenv').config();


var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();
var Order = require('./models/Order.js');

const port = process.env.PORT || 4500;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine', 'pug')
const multer = require('multer');
const path = require('path');
const upload = multer({
	  storage: multer.diskStorage({
		      destination: function (req, file, cb) {
			            cb(null, 'public/uploads/');
			          },
		      filename: function (req, file, cb) {
			            cb(null, new Date().valueOf() + path.extname(file.originalname));
			          }
		    }),
});

mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
   .then(() => console.log('Successfully connected to mongodb'))
   .catch(e => console.error(e));
var server = app.listen(3000, function(){
	console.log("server start:3000port");
})

var buff=0;
var Arr=new Array();
app.post('/',function(req,res){
	console.log(req.body);
	if(req.body.id==="newst84"){
		Order.find({id:req.body.id},function(err,order){
			if(err) return res.status(500).json({error: err});
			console.log(order);
			return res.send(order);
		});
	}
});


app.get('/',function(req,res){

});
app.post('/profile',upload.single('img'),function(req,res){
	console.log(req.body);
	console.log(req.file);
	var order=new Order();
	order.name=req.body.name;
	order.orderCode=req.body.order;
	order.company=req.body.company;
	order.phone=req.body.phone;
	order.id=req.body.id;
	order.product=req.body.product;
	order.image=req.file.filename;
	order.save(function(err){
	if(err){
		console.error(err)
	}
	});
	res.send('Submit Success');
});
app.get('/profile',function(req,res){
	res.render('submitProfile');
});
app.get('/profile/:id',function(req,res){
	Order.findOne({_id:req.params.id},function(err,order){
		if(err) return res.status(500).json({error: err});
		if(!order){
	 	       return res.status(404).json({error: 'order not found'});
		}
		res.render('orderCode');
	});
	
});
app.get('/check/:order',function(req,res){
	Order.findOne({_id:req.params.order},function(err,order){
		if(err) return res.status(500).json({error:err});
		if(!order){
			return res.send("Invalid Code");
		}
		console.log(order);
		res.render('viewProfile',{order:order});
		});
});
