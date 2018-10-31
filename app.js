const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
var querystring = require("querystring");
const mongoose = require('mongoose');

const app = express();
dotenv.load();

const api = process.env.API_KEY;

var Sms = require('./models/sms');

mongoose.connect("mongodb://marmeto:shubham1994@ds145463.mlab.com:45463/headphone_zone", function (err) {

    if (err) throw err;

    console.log('Successfully connected');

});

//Upon Ticket Creation, where source is Portal and Help Issue is "Where is my Order?", "Problem with my Order", "Returns and Exchanges" ONLY where Return Issue is "Check status of return", "Change or Cancel Order", "Payment", "Invoice", "Home Audition Program", "Trade up Program";
app.get('/where', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var issue = req.query.issue;

    issue = issue.replace(/["']/g, "");

    var SMS = querystring.escape("Hello " + name + ", thank you for submitting a ticket with Headphone Zone. Our Customer Happiness Officers have received your request regarding: %2522" + issue + "%2522. You should hear back from us within 1 working day.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "" + issue,
                delivered: "true"
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(200);
        })
        .catch(error => {

            var setSms = new Sms({
                name: "" + name,
                phone: "" + phone,
                issue: "" + issue,
                delivered: "false",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//Upon Ticket Creation, where source is Portal and Help Issue is "Need help buying a Headphone" where What are you looking for? is "Headphones" or "Earphones", and Budget is Any.;
app.get('/looking/headphone', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var looking = req.query.looking;//product name
    var budget = req.query.budget;

    var SMS = querystring.escape("Hello " + name + ", thank you for submitting a ticket with Headphone Zone. Our Headphone Gurus have received your query about " + looking + " around " + budget + ". You should hear back from us within 1 working day.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {

            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + looking,
                budget: "" + budget,
                issue: "Need help buying a Headphone",
                delivered: "true"
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(200);
        })
        .catch(error => {

            var setSms = new Sms({
                name: "" + name,
                phone: "" + phone,
                product: "" + looking,
                budget: "" + budget,
                issue: "Need help buying a Headphone",
                delivered: "false",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//Upon Ticket Creation, where source is Portal and Help Issue is "Need help buying a Headphone" where What are you looking for? is "Amp/DACs" or "Digital Audio Players.";
app.get('/looking/amp', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var looking = req.query.looking;//product name

    var SMS = querystring.escape("Hello " + name + ", thank you for submitting a ticket with Headphone Zone. Our Headphone Gurus have received your query about " + looking + ". You should hear back from us within 1 working day.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {

            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + looking,
                issue: "Need help buying a Headphone",
                delivered: "true"
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(200);
        })
        .catch(error => {

            var setSms = new Sms({
                name: "" + name,
                phone: "" + phone,
                product: "" + looking,
                issue: "Need help buying a Headphone",
                delivered: "false",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//Upon Ticket Creation, where source is Portal and type is "Price too High Requests";
app.get('/type', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;

    var SMS = querystring.escape("Hello " + name + ", thank you for raising a %2522Price too High%2522 request on Headphone Zone. You should hear back from us within 1 working day about whether we can match the price you've found on the competitor's website. We're eager to have you choose us :)");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "Price too High",
                delivered: "true"
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(200);
        })
        .catch(error => {

            var setSms = new Sms({
                name: "" + name,
                phone: "" + phone,
                delivered: "false",
                issue: "Price too High",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});