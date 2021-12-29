// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";  // TODO: will likely not be used

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 *  Nodemailer configuration
 *  (https://nodemailer.com/smtp/)
 */

// send email with nodemailer
const emailData = require("./sensitive.json");
const transporter = nodemailer.createTransport({
    // https://www.email-settings.com/outlook/networksolutions-mail-setup
    host: "smtp.ecaknowgames.com",
    port: 587,
    auth: {
      user: emailData[0]["username"], //process.env.EMAIL,
      pass: emailData[0]["password"], //process.env.PASS,
    },
    tls: {
        rejectUnauthorized: false
    },
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Contact form configured successfully.");
    }
});

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
    res.render("index", { title: "home" });
});

app.get('/:page', (req, res) => {
    const pageRequest = req.params.page;
    // TODO: Add assert
    res.render("index", { title: `${pageRequest}`, appToShow: "none" });
});

const appOptions = ["", "player_x2", "the_gas_laws", "magic_order", "red_treasure", "photo_picasso", "rsb_ttt", "cj_schedule"];
let appDisplayed = "";
app.get('/apps/:app', (req, res) => {
    const appRequested = req.params.app;
    // TODO: Add assert
    if (appOptions.includes(appRequested)) {
        appDisplayed = (appDisplayed == appRequested) ? "" : appRequested; // toggle
        res.render("index", { title: "apps", appToShow: appRequested });
    }
});

app.post('/send_email', (req, res) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const subject = req.body['subject'];
    const message = req.body['message'];

    if (name && email && subject && message) {
        const mail = {
            from: email,
            to: 'admin@ecaknowgames.com',
            subject: subject,
            text: `From: ${name} <${email}> \n${message}`,
        };
    
        transporter.sendMail(mail, (err, data) => {
            // TODO: display error / success graphically
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong.");
            } else {
              res.status(200).render("index", { title: 'contact' }); // Email successfully sent to recipient!
            }
        });
    }
});

/**
 * Server Activation
 */
app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
});