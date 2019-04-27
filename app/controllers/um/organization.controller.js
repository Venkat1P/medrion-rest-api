const Organization = require('../../models/um/organization.model.js');


// Create and Save a new Organization
exports.create = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate request

        if (!req.body) {
            return res.status(400).send({
                message: "Organization body can not be empty"
            });
        }

        // Create a Organization
        const organization = new Organization(req.body);
        req.body['org_status'] = "Active";
        // Save Organization in the database
        organization.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Organization."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};



// Retrieve and return all organizations from the database.
exports.findAll = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        Organization.find()
            .then(organizations => {
                res.send(organizations);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving organizations."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Find a single organization with a id
exports.findOne = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Organization.findById(req.params.id)
            .then(organization => {
                if (!organization) {
                    return res.status(404).send({
                        message: "Organization not found " + req.params.id
                    });
                }
                res.send(organization);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Organization not found " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Organization " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Update a Organization identified by the id in the request
exports.update = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "Organization body can not be empty"
            });
        }

        // Find Organization and update it with the request body
        
        Organization.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(organization => {
                if (!organization) {
                    return res.status(404).send({
                        message: "Organization not found with id " + req.params.id
                    });
                }
                
                res.send(organization);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Organization not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error updating Organization with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }





};





// Delete a organization with the specified organizationId in the request
exports.delete = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        Organization.findByIdAndRemove(req.params.id)
            .then(organization => {
                if (!organization) {
                    return res.status(404).send({
                        message: "Organization not found with id " + req.params.id
                    });
                }
                
                res.send({ message: "Organization deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Organization not found with id " + req.params.id
                    });
                }
                
                return res.status(500).send({
                    message: "Could not delete organization with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};
