const Department = require('../../models/um/department.model.js');


// Create and Save a new Department
exports.create = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate request

        if (!req.body) {
            return res.status(400).send({
                message: "Department body can not be empty"
            });
        }
        // Create a Department
        const department = new Department(req.body);
        
        // Save Department in the database
        department.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Department."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};



// Retrieve and return all departments from the database.
exports.findAll = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        Department.find()
            .then(departments => {
                
                res.send(departments);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving departments."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Find a single department with a id
exports.findOne = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Department.findById(req.params.id)
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: "Department not found " + req.params.id
                    });
                }
                res.send(department);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Department not found " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Department " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Update a Department identified by the id in the request
exports.update = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "Department body can not be empty"
            });
        }

        // Find Department and update it with the request body
        
        Department.findByIdAndUpdate(req.params.id, req.body)
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: "Department not found with id " + req.params.id
                    });
                }
                
                res.send(department);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Department not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error updating Department with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Delete a department with the specified departmentId in the request
exports.delete = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Department.findByIdAndRemove(req.params.id)
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: "Department not found with id " + req.params.id
                    });
                }
                
                res.send({ message: "Department deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Department not found with id " + req.params.id
                    });
                }
                
                return res.status(500).send({
                    message: "Could not delete department with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};
