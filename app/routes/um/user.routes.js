module.exports = (app) => {
    const users = require('../../controllers/um/user.controller.js');

    // Create a new Note
    app.post('/api/um/users', users.create);

    // Retrieve all Notes
    app.get('/api/um/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/um/users/:id', users.findOne);

    // Update a Note with noteId
    app.put('/api/um/users/:id', users.update);

    // Delete a Note with noteId
    app.delete('/api/um/users/:id', users.delete);
}