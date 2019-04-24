module.exports = (app) => {
    const roles = require('../../controllers/um/role.controller.js');

    // Create a new Note
    app.post('/api/um/roles', roles.create);

    // Retrieve all Notes
    app.get('/api/um/roles', roles.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/um/roles/:id', roles.findOne);

    // Update a Note with noteId
    app.put('/api/um/roles/:id', roles.update);

    // Delete a Note with noteId
    app.delete('/api/um/roles/:id', roles.delete);
}