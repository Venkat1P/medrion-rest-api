const mongoose = require('mongoose');

const roleSchema = mongoose.Schema(
    {
        role_code: String,
        role_name: String,
        role_description: String,
        role_template: String
    }
);
module.exports = mongoose.model('Role', roleSchema, 'um_role');