require("dotenv").config();
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const utils = require("./src/utils/utils");


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use('/api/users', require("./src/user/user.controller"));
app.use('/api/maintenance', require("./src/maintenance/maintenance.controller"))


// Global error handler
app.use(utils.errorHandler)




// Configuration for starting the server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
