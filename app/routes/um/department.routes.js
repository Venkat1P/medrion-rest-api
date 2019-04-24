module.exports = (app) => {
    const departments = require('../controllers/department.controller.js');

    // Create a new Note
    app.post('/departments', departments.create);

    // Retrieve all Notes
    app.get('/departments', departments.findAll);

    // Retrieve a single Note with noteId
    app.get('/departments/:id', departments.findOne);

    // Update a Note with noteId
    app.put('/departments/:id', departments.update);

    // Delete a Note with noteId
    app.delete('/departments/:id', departments.delete);
}