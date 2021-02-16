const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
    const payload = {
        user: id
    }

    return jwt.sign(payload, process.env.suflexSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;