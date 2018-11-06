var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/headphone_zone", function (err) {
        if (err) throw err;
    });
var smsSchema = new mongoose.Schema({
    sender_id: { type: String },
    name: { type: String },
    phone: { type: String },
    product: { type: String },
    budget: { type: String },
    issue: { type: String },
    send_at: {type: Date, default: Date.now},
    delivered: { type: String },
    delivered_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Sms', smsSchema);
