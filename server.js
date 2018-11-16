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
	var beacons=req.body.beacons;
	for(var i=0;i<beacons.length;i++){

		if(beacons[i].beaconType==='eddystone_url'
	&&buff!=beacons[i].lastSeen){
			Arr.push(beacons[i]);
			var date = new Date(beacons[i].lastSeen);
			// Hours part from the timestamp
			var hours = date.getHours();
			// Minutes part from the timestamp
			var minutes = "0" + date.getMinutes();
			// Seconds part from the timestamp
			var seconds = "0" + date.getSeconds();

			// Will display time in 10:30:23 format
			var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
			beacons[i].formattedTime=formattedTime
			console.log(beacons[i].distance,beacons[i].rssi,beacons[i].txPower,beacons[i].lastSeen-buff,beacons[i].lastSeen,beacons[i].formattedTime);
			buff=beacons[i].lastSeen;
		}
	}
});


app.get('/',function(req,res){
	Arr.sort(function(a,b){
		return a.lastSeen-b.lastSeen;
	});
	console.log('--------------------------------------------');
	console.log(Arr.length)
	var str='';
	var lastSave=Arr[0].lastSeen;
	for(var i=0;i<Arr.length;i++){
		console.log(Arr[i].distance,Arr[i].rssi,Arr[i].txPower,Arr[i].lastSeen-lastSave,Arr[i].lastSeen,Arr[i].formattedTime);
                str+=(Arr[i].distance+' '+Arr[i].rssi+' '+Arr[i].txPower+' '+(Arr[i].lastSeen-lastSave)+' '+Arr[i].lastSeen+' '+Arr[i].formattedTime+'<BR>');
		lastSave=Arr[i].lastSeen;
	}
	console.log('--------------------------------------------');
	Arr=[];
	res.send(str);

});
app.post('/profile',upload.single('img'),function(req,res){
	console.log(req.body);
	console.log(req.file);
	var order=new Order();
	order.name=req.body.name;
	order.orderCode=req.body.order;
	order.company=req.body.company;
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
	Order.findOne({orderCode:req.params.order},function(err,order){
		if(err) return res.status(500).json({error:err});
		if(!order){
			return res.send("Invalid Code");
		}
		console.log(order);
		res.render('viewProfile',{order:order});
		});
});
