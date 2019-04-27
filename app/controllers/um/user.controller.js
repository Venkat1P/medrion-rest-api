const UMUser = require('../../models/um/user.model.js');


// Create and Save a new UMUser
exports.create = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate request

        if (!req.body) {
            return res.status(400).send({
                message: "UMUser body can not be empty"
            });
        }

        // Create a UMUser
        req.body['user_status'] = "Active";
        const user = new UMUser(req.body);

        // Save UMUser in the database
        user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the UMUser."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};



// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        UMUser.find()
            .then(users => {
                
                res.send(users);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Find a single user with a id
exports.findOne = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        UMUser.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "UMUser not found " + req.params.id
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "UMUser not found " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving UMUser " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};





// Update a UMUser identified by the id in the request
exports.update = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "UMUser body can not be empty"
            });
        }

        // Find UMUser and update it with the request body
        
        UMUser.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "UMUser not found with id " + req.params.id
                    });
                }
                
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "UMUser not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error updating UMUser with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }





};





// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        
        UMUser.findByIdAndRemove(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "UMUser not found with id " + req.params.id
                    });
                }
                
                res.send({ message: "UMUser deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "UMUser not found with id " + req.params.id
                    });
                }
                
                return res.status(500).send({
                    message: "Could not delete user with id " + req.params.id
                });
            });
    } else {
        res.redirect('/api/login');
    }




};
