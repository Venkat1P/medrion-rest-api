const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        dept_code: String,
        dept_name: String,
        dept_parent_name: String,
        dept_incharge: String,
        dept_description: String
    }
);
module.exports = mongoose.model('Department', UserSchema, 'um_department');