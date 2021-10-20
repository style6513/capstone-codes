const router = require("express").Router();
const User = require("../model/User");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

function createToken(user) {
    console.log(user.isAdmin !== undefined, 
        "createToken passed user without isAdmin property"
    );
    let payload = {
        username : user.username,
        isAdmin : user.isAdmin || false
    };
    return jwt.sign(payload, SECRET)
}

// this is login
// post /auth/token { username, password } => { token }
// Returns JWT token which can be used to authenticate further requests.
// Authorization rqeuired : none
router.post("/token", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await  User.authenticate(username, password);
``
        const token = createToken(user);
        return res.json({ token });
    }
    catch(e) {
        return next(e);
    }
})

// POST  /auth/register : { user } => { token }
// use must include { username, password, email }
// returns jwt token which can be used to authenticate further requests.
router.post("/register", async (req, res, next) => {
    try {
        const newUser = await User.register({ ...req.body, isAdmin : false })
        const token = createToken(newUser);
        return res.status(201).json({ token })
    }
    catch(e) {
        return next(e);
    }
})

module.exports = router;