module.exports = (app) => {
    const organizations = require('../../controllers/um/organization.controller.js');

    // Create a new Note
    app.post('/api/um/organizations', organizations.create);

    // Retrieve all Notes
    app.get('/api/um/organizations', organizations.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/um/organizations/:id', organizations.findOne);

    // Update a Note with noteId
    app.put('/api/um/organizations/:id', organizations.update);

    // Delete a Note with noteId
    app.delete('/api/um/organizations/:id', organizations.delete);
}