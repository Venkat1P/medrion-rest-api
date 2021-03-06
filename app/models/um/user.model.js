const mongoose = require('mongoose');

const userUmSchema = mongoose.Schema(
    {
        user_code: String,
        user_type: Boolean,
        user_emailId: String,
        user_confirm_emailId: String,
        user_ssn: String,
        user_title: String,

        user_first_name: String,
        user_middle_name: String,
        user_last_name: String,
        user_full_name: String,
        user_gender: String,

        user_designation: String,
        user_phone_number: String,
        user_phone_number_ext: String,
        user_alternate_phone_number: String,
        user_alternate_phone_number_ext: String,

        user_department: String,
        user_reporting_manager: String,
        user_organization: String,

        user_status: String
    }
);
module.exports = mongoose.model('UMUser', userUmSchema, 'um_user');
