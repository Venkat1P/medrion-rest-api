const Organization = require('../../models/um/organization.model.js');


// Create and Save a new Organization
exports.create = (req, res) => {
    // Validate request
    
    if(!req.body) {
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
};



// Retrieve and return all organizations from the database.
exports.findAll = (req, res) => {
    Organization.find()
    .then(organizations => {
        console.log(organizations)
        res.send(organizations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving organizations."
        });
    });
};





// Find a single organization with a id
exports.findOne = (req, res) => {
    console.log(req.params.id)
    Organization.findById(req.params.id)
    .then(organization => {
        if(!organization) {
            return res.status(404).send({
                message: "Organization not found " + req.params.id
            });            
        }
        res.send(organization);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Organization not found " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Organization " + req.params.id
        });
    });
};





// Update a Organization identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Organization body can not be empty"
        });
    }

    // Find Organization and update it with the request body
    console.log(req.body)
    Organization.findByIdAndUpdate(req.params.id, req.body , {new: true})
    .then(organization => {
        if(!organization) {
            return res.status(404).send({
                message: "Organization not found with id " + req.params.id
            });
        }
        console.log(organization)
        res.send(organization);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Organization not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Organization with id " + req.params.id
        });
    });
};





// Delete a organization with the specified organizationId in the request
exports.delete = (req, res) => {
    console.log(req.body)
    Organization.findByIdAndRemove(req.params.id)
    .then(organization => {
        if(!organization) {
            return res.status(404).send({
                message: "Organization not found with id " + req.params.id
            });
        }
        console.log(organization)
        res.send({message: "Organization deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Organization not found with id " + req.params.id
            });                
        }
        console.log(organization)
        return res.status(500).send({
            message: "Could not delete organization with id " + req.params.id
        });
    });
};
