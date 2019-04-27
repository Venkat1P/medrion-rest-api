const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: String,
        mailId: String,
        password: String,
        phone_number: String,
        has_logged_in: Boolean,
        role: {
            role_type: String,
            permissions: [
                {
                    name: String,
                    id: String,
                    icon_type: String,
                    icon: String,
                    screens: [
                        {
                            name: String,
                            id: String
                        }
                    ]
                }
            ]
        }
    }
);
module.exports = mongoose.model('User', UserSchema, 'user');