const Sequelize = require("sequelize");
const sequelizeConnection = new Sequelize(
    'biodata',
    'root',
    '',
    {
        host: "localhost",
        dialect: 'mysql'
    }
);

sequelizeConnection.authenticate().then(() => {
    console.log('connection has been established succesfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - applilcation/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models');
db.sequelizeConnection.sync()
    .then(()=> {
        console.log('Synced db.');
    })
    .catch((err)=> {
        console.log("Failed to sync db: " + err.message);
    });

// Import book controller
const biodataController = require("./app/controllers/biodata.controllers.js")

//creat book route
app.post("/", (req,res) => {
    biodataController.create(req,res)
})
// find all books route
app.get('/',(req,res) => {
    biodataController.findAll(req,res)
})
//find book by id route
app.get("/:id", (req,res) => {
    biodataController.findOne(req,res)
})

app.patch("/:id", (req,res) => {
    biodataController.update(req,res)
})

app.post("/:id", (req,res) => {
    biodataController.delete(req,res)
})
//set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

