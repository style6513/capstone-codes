const express = require("express")
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const db = require("../db/db")
const User = require("../model/User");

// GET USER by username
// returns => { username, email }
// Authorization required signedIn
router.get("/:username", async (req, res ,next) => {
    try {
        const { username } = req.params;
        // const user = await User.get(username);
        const userResults = await db.query(`SELECT username, email FROM users WHERE username = $1`, [username])
        const user = userResults.rows[0];
        return res.json({ user });
    }
    catch(e) {
        return next(e);
    }
})


module.exports = router;