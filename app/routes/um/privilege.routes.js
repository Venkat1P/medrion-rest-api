module.exports = (app) => {
    const privileges = require('../../controllers/um/privilege.controller.js');

    // Create a new Note
    app.post('/api/um/privileges', privileges.create);

    // Retrieve all Notes
    app.get('/api/um/privileges', privileges.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/um/privileges/:id', privileges.findOne);

    // Update a Note with noteId
    app.put('/api/um/privileges/:id', privileges.update);

    // Delete a Note with noteId
    app.delete('/api/um/privileges/:id', privileges.delete);
}