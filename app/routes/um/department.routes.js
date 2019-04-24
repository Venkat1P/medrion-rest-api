module.exports = (app) => {
    const departments = require('../../controllers/um/department.controller.js');

    // Create a new Note
    app.post('/api/departments', departments.create);

    // Retrieve all Notes
    app.get('/api/departments', departments.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/departments/:id', departments.findOne);

    // Update a Note with noteId
    app.put('/api/departments/:id', departments.update);

    // Delete a Note with noteId
    app.delete('/api/departments/:id', departments.delete);
}