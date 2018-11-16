var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/secuvery");
autoIncrement.initialize(connection);
var orderSchema = new Schema({
	    id: String,
	    name: String,
	    company:String,
	    phone:String,
	    product:String,
	    UUID:{type:String,default:'2f234454-cf6d-4a0f-adf2-f4911ba9ffa6'},
	    Major:{type:String,default:'1'},
	    image:String
});
orderSchema.plugin(autoIncrement.plugin, 'Order');
module.exports = mongoose.model('order', orderSchema);
