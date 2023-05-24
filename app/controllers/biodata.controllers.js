const db = require('../models')

const Biodata = db.biodata;
const Op = db.Sequelize.Op;

// create biodata method
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
        return;
    }


// Create biodata object
const biodata = {
    nama: req.body.nama,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat
};

// Save book to database
Biodata.create(biodata)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error occured while inserting book."

        })
    })

}

// Retrieve all Books from the database
exports.findAll = (req,res) => {
    Biodata.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while retrieving books."
        })
    })
}

//Find a single Books with an id
exports.findOne = (req,res) => {
    Biodata.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while finding book."
        })
    })
}

exports.update = (req,res) => {
   const {id} = req.params.id;
   
   res.send({
    message: 'Update success',
    data: req.body,
   })
}


exports.delete = (req,res) => {
    Biodata.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: "Success delete book with id = " + req.params.id + "!"
        })
    )
    .catch(err => {
        res.status(500).send({
            message: "Could not delete book with id " + req.params.id
        })
    })
}

