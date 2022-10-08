// * Module imports.

const express  = require('express');
const cors = require('cors');

// * Custom imports
// Todo: Constants import

const { PORT } = require('./config/constants/Constants');
const { API_VERSION } = require('./config/constants/Constants');

// Todo: Database import

const sequelize = require('./api/db/db');

// Todo: Association import

// Todo: Routes import

const userSignUpSignInRouter = require('./api/routes/userSignUpSignIn');
const productRouter = require('./api/routes/product');

// * Initialize express App.

const app = express();

// * Cors middleware => to avoid conflicts with other origins and not getting data flow blocked.

let corsOption = {
    origin: true
};
app.use(cors(corsOption));

// * Body parser => required to parse incoming request bodies in a middleware before handled by the server.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Todo: Test DB initialization

sequelize.authenticate()
    .then(() => console.log(new Date(),' Connection has been established successfully!'))
    .catch((error) => console.log(new Date(),' Unable to connect to the database:', error));

// Todo: Test DB connection established and synced.

sequelize.sync();

// * Demo route to test server.

app.get("/", (req, res) => {
    res.json({message: "Welcome to trox project!"});
});

// Todo: Add routes

app.use(API_VERSION, userSignUpSignInRouter);
app.use(API_VERSION, productRouter);

// * Use PORT to establish connection with the server.
app.listen(PORT, () => {
    console.log("**************************************")
    console.log(`  Server is running on port ${PORT}  `)
    console.log("**************************************")
});