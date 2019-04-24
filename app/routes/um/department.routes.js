module.exports = (app) => {
    const departments = require('../../controllers/um/department.controller.js');

    // Create a new Note
    app.post('/api/um/departments', departments.create);

    // Retrieve all Notes
    app.get('/api/um/departments', departments.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/um/departments/:id', departments.findOne);

    // Update a Note with noteId
    app.put('/api/um/departments/:id', departments.update);

    // Delete a Note with noteId
    app.delete('/api/um/departments/:id', departments.delete);
}