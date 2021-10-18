const express = require("express")
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const User = require("../model/User");

// GET USER by username
// returns => { username, email }
// Authorization required signedIn
router.get("/:username", async (req, res ,next) => {
    try {
        const { username } = req.params;
        const user = await User.get(username);
        // const user = await db.query(`SELECT username, email FROM users WHERE usernmae = $1`, [username])
        return res.json({ user });
    }
    catch(e) {
        return next(e);
    }
})


module.exports = router;