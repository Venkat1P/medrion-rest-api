const mongoose = require('mongoose');

const privilegeSchema = mongoose.Schema(
    {
        privilege_module_name: String,
        privilege_feature_name: String,
        privilege_opr_name: String
    }
);
module.exports = mongoose.model('Privilege', privilegeSchema, 'um_privilege');