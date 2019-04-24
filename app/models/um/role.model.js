const mongoose = require('mongoose');

const Schema = mongoose.Schema(
    {
        role_code: String,
        role_name: String,
        role_description: String,
        role_template: String
    }
);
module.exports = mongoose.model('Department', Schema, 'um_role');