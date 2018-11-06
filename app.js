const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
var querystring = require("querystring");
const mongoose = require('mongoose');

const app = express();
dotenv.load();

const api = process.env.API_KEY;

var Sms = require('./models/sms');

mongoose.connect("mongodb://localhost:27017/headphone_zone", function (err) {

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

//When new warranty case is created where Warranty Case Status is empty, Group is CHOs - Warranty and Status is open, and Brand and Product have any values.;
app.get('/warranty', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var product = req.query.product;
    var wcid = req.query.wcid;

    var SMS = querystring.escape("Hi " + name + ", we've received your Warranty Claim Request for " + product + ". Your Warranty CaseID is " + wcid + ". You should hear back from us about whether your case is approved or rejected within the next 1 working day.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "New Warranty is created with id - " + wcid,
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
                product: "" + product,
                issue: "New Warranty is created with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When scenario automation is ran: "Warranty Case Approval - (Customer to send to Chennai)";
app.get('/warranty/chennai', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var wcid = req.query.wcid;
    var email = req.query.email;

    var SMS = querystring.escape("Good news," + name + "! Your Warranty Claim Request with WCID " + wcid + " is Approved. The next step is for you to send the product to our Chennai inspection facility. Please check your email " + email + " for more details.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "Warranty Case Approval - (Customer to send to Chennai) with id - " + wcid,
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
                product: "" + product,
                issue: "Warranty Case Approval - (Customer to send to Chennai) with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty case scenario automation is ran "Warranty Case Approval - (Customer to send to Mumbai)"";
app.get('/warranty/mumbai', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var wcid = req.query.wcid;
    var email = req.query.email;

    var SMS = querystring.escape("Good news," + name + "! Your Warranty Claim Request with WCID " + wcid + " is Approved. The next step is for you to send the product to our Mumbai inspection facility. Please check your email " + email + " for more details.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "Warranty Case Approval - (Customer to send to Mumbai) with id - " + wcid,
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
                product: "" + product,
                issue: "Warranty Case Approval - (Customer to send to Mumbai) with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty case scenario automation is ran "Warranty Case - Pending on Inspection"";
app.get('/warranty/pending', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var product = req.query.product;
    var wcid = req.query.wcid;

    var SMS = querystring.escape("Thank you for sending your " + product + " against Warranty Case ID " + wcid + ". Once we receive your product, please give us 7 working days to come back to you with an inspection status.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "Warranty Case - Pending on Inspection with id - " + wcid,
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
                product: "" + product,
                issue: "Warranty Case - Pending on Inspection with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty case status field changes to "Defect Found - Replacement"";
app.get('/warranty/defect/replacement', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var product = req.query.product;
    var wcid = req.query.wcid;

    var SMS = querystring.escape("Hey " + name + ", our inspection team has found the defect in your " + product + "! We'll be sending your replacement against your WCID " + wcid + " and share tracking details with you soon. ");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "Defect Found - Replacement with id - " + wcid,
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
                product: "" + product,
                issue: "Defect Found - Replacement with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty case status field changes to "Defect Found - Repaired"";
app.get('/warranty/defect/repaired', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var product = req.query.product;
    var wcid = req.query.wcid;

    var SMS = querystring.escape("Hey " + name + ", our inspection team has repaired the defect found in your " + product + "! We'll be sending your repaired product against your WCID " + wcid + " and share tracking details with you soon.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "Defect Found - Repaired with id - " + wcid,
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
                product: "" + product,
                issue: "Defect Found - Repaired with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty case status field changes to "Defect Found - Store Credit"";
app.get('/warranty/defect/credit', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var product = req.query.product;
    var wcid = req.query.wcid;

    var SMS = querystring.escape("Hey " + name + ", our inspection team has found the defect in your " + product + "! Since we don't have any inventory to send you a replacement, you will receive Store Credit against your WCID " + wcid + " shortly.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "Defect Found - Store Credit with id - " + wcid,
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
                product: "" + product,
                issue: "Defect Found - Store Credit with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty tracking ID field is filled
app.get('/warranty/tracking', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var wcid = req.query.wcid;
    var tracking = req.query.tracking;

    var SMS = querystring.escape("Your Warranty Case ID " + wcid + " is finally coming to the end. We have sent the unit and here are the details: " + tracking + ". It will take about 3-4 working days for the unit to be delivered. You may track the shipment here: https://www.bluedart.com/");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "tracking ID field is filled with id - " + tracking,
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
                issue: "tracking ID field is filled with id - " + tracking,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty store credit field is filled
app.get('/warranty/credit', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var wcid = req.query.wcid;
    var product = req.query.product;
    var credit = req.query.credit;

    var SMS = querystring.escape("Your Warranty Case ID " + wcid + " is finally coming to the end. We have issed you Store Credit that you can apply at checkout: " + credit + ". The amount of the store credit is the same as what you paid for your " + product + ".");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "store credit field is filled with id - " + credit,
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
                product: "" + product,
                issue: "store credit field is filled with id - " + credit,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When warranty case status is "Rejected"
app.get('/warranty/rejected', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var wcid = req.query.wcid;
    var email = req.query.email;

    var SMS = querystring.escape("Bad news, " + name + "! Your Warranty Claim Request with WCID " + wcid + " is Rejected. This usually happens if your claim is ineligible. Please check your email " + email + "for more details.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                product: "" + product,
                issue: "case status is Rejected with id - " + wcid,
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
                product: "" + product,
                issue: "case status is Rejected with id - " + wcid,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When ticket is created where type is "Enquiry" and Help issue is blank in Group Gurus
app.get('/enquiry/blank', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;

    var SMS = querystring.escape("Hello " + name + ", thank you for leaving a product enquiry with Headphone Zone. Our Headphone Gurus should respond to you within 1 working day.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "type is Enquiry and Help issue is blank",
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
                issue: "type is Enquiry and Help issue is blank",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When status changes to "Attempted to contact" for only the types "Enquiry" in Group Gurus
app.get('/enquiry/attempted', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;

    var SMS = querystring.escape("Hi " + name + ", we tried to get in touch with you but couldn't get through. Feel free to call us at +917506646988 at your convenience or just reply to our email. We want to hook you up with some good headphones!");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "Attempted to contact",
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
                issue: "Attempted to contact",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When status changes to "Resolved" for only the types "Price too high requests" and "Enquiry" in Group Gurus
app.get('/enquiry/resolved', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var survey = req.query.survey;

    var SMS = querystring.escape("Hi " + name + ", we hope we were able to help you find good headphones. We've resolved your enquiry from our end. In case you need more help, feel free to reply to our email. Please give us your feedback here: " + survey + "");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "Resolved",
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
                issue: "Resolved",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When status changes to "Waiting on customer" where group is CHOs
app.get('/status/waiting', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var ticket_id = req.query.ticket;

    var SMS = querystring.escape("Hello " + name + ", our Customer Happiness Officers are waiting to hear from you regarding your Headphone Zone ticket #" + ticket_id + ". Please reply to the email we have sent you. We're eager to resolve your problem as soon as we can :)");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "Waiting on customer with ticket id - " + ticket_id,
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
                issue: "Waiting on customer with ticket id - " + ticket_id,
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When status changes to "Pending on Return inspection"
app.get('/status/pending', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;

    var SMS = querystring.escape("Hi " + name + ", your RMA is pending on inspection. We'll get back to you as soon as we have an inspection status. Thank you for your patience - we really appreciate it :)");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "Pending on Return inspection",
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
                issue: "Pending on Return inspection",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When CHO ticket is resolved if group is CHOs
app.get('/resolved', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;
    var survey = req.query.survey;

    var SMS = querystring.escape("Hi " + name + ", we hope we were able to help you. We've resolved your ticket from our end. In case you need more help, feel free to reply to our email. Please give us your feedback here: " + survey + "");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "ticket is resolved",
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
                issue: "ticket is resolved",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When type Missed call and status is attempted to contact and ticket is tagged "return related" for group CHO - Returns
app.get('/missed', (req, res) => {
    var subject = req.query.subject;

    var SMS = querystring.escape("Hi, you left us a missed call where you had a question about returns. Our Customer Happiness Officers tried calling you back but couldn't get through. Please call us again at +917506646988. We're available on call from Monday through Saturday, 10 AM to 6:30 PM.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "missed call where you had a question about returns",
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
                issue: "missed call where you had a question about returns",
                delivered_at: null
            })
            setSms.save(function (err) {
                if (err) throw err;

                console.log('SMS successfully saved.');
            });

            res.sendStatus(500);
        });
});

//When type Missed call and status is attempted to contact and ticket is tagged "return related" for group CHO - Returns
app.get('/missed/return', (req, res) => {
    var name = req.query.name;
    var phone = req.query.phone;

    var SMS = querystring.escape("Hi, you left us a missed call where you had a question about returns. Our Customer Happiness Officers tried calling you back but couldn't get through. Please call us again at +917506646988. We're available on call from Monday through Saturday, 10 AM to 6:30 PM.");

    axios.get("https://2factor.in/API/R1/?module=TRANS_SMS&apikey=" + api + "&to=" + phone + "&from=HPZONE&msg=" + SMS)
        .then(response => {
            var setSms = new Sms({
                sender_id: "" + response.data.Details,
                name: "" + name,
                phone: "" + phone,
                issue: "missed call where you had a question about returns",
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
                issue: "missed call where you had a question about returns",
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
