var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/secuvery");
autoIncrement.initialize(connection);
var testorderSchema = new Schema({
	    id: String,
	    name: String,
	    company:String,
	    phone:String,
	    product:String
});
module.exports = mongoose.model('testorder', testorderSchema);
