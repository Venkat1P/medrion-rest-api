const mongoose = require('mongoose');

const Schema = mongoose.Schema(
    {
        privilege_module_name: String,
        privilege_feature_name: String,
        privilege_opr_name: String
    }
);
module.exports = mongoose.model('Department', Schema, 'um_privilege');