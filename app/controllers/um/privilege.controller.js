const Privilege = require('../../models/um/privilege.model.js');


// Create and Save a new Privilege
exports.create = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate request

        if (!req.body) {
            return res.status(400).send({
                message: "Privilege body can not be empty"
            });
        }

        // Create a Privilege
        const privilege = new Privilege(req.body);
        
        // Save Privilege in the database
        privilege.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Privilege."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};



// Retrieve and return all privileges from the database.
exports.findAll = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        Privilege.find()
            .then(privileges => {
                res.send(privileges);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving privileges."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Find a single privilege with a id
exports.findOne = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Privilege.findById(req.params.id)
            .then(privilege => {
                if (!privilege) {
                    return res.status(404).send({
                        message: "Privilege not found " + req.params.id
                    });
                }
                res.send(privilege);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Privilege not found " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Privilege " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Update a Privilege identified by the id in the request
exports.update = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "Privilege body can not be empty"
            });
        }

        // Find Privilege and update it with the request body
        
        Privilege.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(privilege => {
                if (!privilege) {
                    return res.status(404).send({
                        message: "Privilege not found with id " + req.params.id
                    });
                }
                
                res.send(privilege);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Privilege not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error updating Privilege with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Delete a privilege with the specified privilegeId in the request
exports.delete = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Privilege.findByIdAndRemove(req.params.id)
            .then(privilege => {
                if (!privilege) {
                    return res.status(404).send({
                        message: "Privilege not found with id " + req.params.id
                    });
                }
                
                res.send({ message: "Privilege deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Privilege not found with id " + req.params.id
                    });
                }
                
                return res.status(500).send({
                    message: "Could not delete privilege with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};
