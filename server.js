const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const User = require('./app/models/user.model.js');



mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.json({ isLoggedIn: true, message:"You are logged In!"});
    } else {
        next();
    }
};

app.get('/api', sessionChecker, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.redirect('/api/login');
});

app.route('/api/login')
    .get(sessionChecker, (req, res) => {
        res.json({ "isLoggedIn": false, "message": "Please log In" });
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        User.findOne({ username: username }).then(function (user) {
            if (!user) {
                res.json({ "isLoggedIn": false, "message": "No user found" });
            } else if (password !== user.password) {
                res.json({ "isLoggedIn": false, "message": "Password is wrong" });
            } else {
                req.session.user = user;
                res.json({ isLoggedIn: true, userDetails: user });
            }
        });
    });

    app.get('/home', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.sendFile(__dirname + '/home');
        } else {
            res.redirect('/login');
        }
    });
    

// route for user logout
app.get('/api/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.json({ "isLoggedIn": false, "message": "Please log In" });
    } else {
        res.json({ "isLoggedIn": false, "message": "Please log In" });
    }
});



require('./app/routes/user.routes.js')(app);

// user management
require('./app/routes/um/department.routes.js')(app);
require('./app/routes/um/organization.routes.js')(app);
require('./app/routes/um/role.routes.js')(app);
require('./app/routes/um/privilege.routes.js')(app);
require('./app/routes/um/user.routes.js')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});
