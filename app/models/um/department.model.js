const mongoose = require('mongoose');

const deptSchema = mongoose.Schema(
    {
        dept_code: String,
        dept_name: String,
        dept_parent_name: String,
        dept_incharge: String,
        dept_description: String,
        
        dept_status: String
    }
);
module.exports = mongoose.model('Department', deptSchema, 'um_department');