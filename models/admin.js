const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const AdminSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    sellers: [String],
    buyers: [String],
    requests: [String],
    offers: [String]
});


AdminSchema.statics.findByEmailPassword = function (email, password) {
    const Admin = this

    return Admin.findOne({
        email: email
    }).then((admin) => {
        if (!admin) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, admin.password, (error, result) => {
                if (result) {
                    resolve(admin)
                } else {
                    reject()
                }
            })
        })
    })
}

// This function runs before saving/modifying user to database
AdminSchema.pre('save', function (next) {
	const admin = this

	if (admin.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(admin.password, salt, (error, hash) => {
				admin.password = hash
				next()
			})
		})
	} else {
		next()
	}

})


module.exports = mongoose.model("Admin", AdminSchema);