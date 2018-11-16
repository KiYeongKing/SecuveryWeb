var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/secuvery");
autoIncrement.initialize(connection);
var orderSchema = new Schema({
	    orderCode: String,
	    name: String,
	    company:String,
	    image:String
});
orderSchema.plugin(autoIncrement.plugin, 'Order');
module.exports = mongoose.model('order', orderSchema);
