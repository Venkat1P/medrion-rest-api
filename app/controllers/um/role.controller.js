const Role = require('../../models/um/role.model.js');


// Create and Save a new Role
exports.create = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate request

        if (!req.body) {
            return res.status(400).send({
                message: "Role body can not be empty"
            });
        }

        // Create a Role
        const role = new Role(req.body);
        
        // Save Role in the database
        role.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Role."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};



// Retrieve and return all roles from the database.
exports.findAll = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        Role.find()
            .then(roles => {
                res.send(roles);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving roles."
                });
            });
    } else {
        res.redirect('/api/login');
    }





};





// Find a single role with a id
exports.findOne = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Role.findById(req.params.id)
            .then(role => {
                if (!role) {
                    return res.status(404).send({
                        message: "Role not found " + req.params.id
                    });
                }
                res.send(role);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Role not found " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Role " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Update a Role identified by the id in the request
exports.update = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "Role body can not be empty"
            });
        }

        // Find Role and update it with the request body
        
        Role.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(role => {
                if (!role) {
                    return res.status(404).send({
                        message: "Role not found with id " + req.params.id
                    });
                }
                
                res.send(role);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Role not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error updating Role with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Delete a role with the specified roleId in the request
exports.delete = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Role.findByIdAndRemove(req.params.id)
            .then(role => {
                if (!role) {
                    return res.status(404).send({
                        message: "Role not found with id " + req.params.id
                    });
                }
                
                res.send({ message: "Role deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Role not found with id " + req.params.id
                    });
                }
                
                return res.status(500).send({
                    message: "Could not delete role with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};
