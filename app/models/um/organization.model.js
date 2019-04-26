const mongoose = require('mongoose');

const orgSchema = mongoose.Schema(
    {
        org_code: String,
        org_name: String,
        org_description: String,
        org_default_currency: String,
        org_logo: String,

        org_ist: Boolean,
        org_eap: Boolean,
        org_grants: Boolean,
        org_valid_up_to: String,
        org_address_1: String,

        org_address_2: String,
        org_zip_code: String,
        org_city: String,
        org_country: String,
        org_state: String,

        org_phone_no: String,
        org_fax_no: String,
        org_website: String,
        org_emailId: String,
        org_title: String,

        org_main_header: String,
        org_sub_header: String,
        
        org_status: String,
        org_no_of_licensed_modules: String
    }
);
module.exports = mongoose.model('Organization', orgSchema, 'um_organization');
