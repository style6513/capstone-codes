const express = require("express");
const router = express.Router();
const {  ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const db = require("../db/db");
const { NotFoundError, BadRequestError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate");

// GET codes/
// returns => [ { codeid, codename, description, }, { } ]
router.get("/"  ,async (req, res, next) => {
    try {
        const codes = await db.query(`SELECT * FROM codes`);
        return res.json({ codes : codes.rows });
    } catch(e) {
        return next(e);
    }
});
// GET /codes/:id
// return => { id, name, description, price, image }
// we serialize the input so that we prevent SQL injection
router.get("/:id", async (req, res, next) => {
    try {
        const code = await db.query(`SELECT * FROM codes WHERE id = $1`, [req.params.id]);
        if(!code.rows.length) {
            throw new NotFoundError()
        }
        return res.json({ code : code.rows[0]})
    } catch(e) {
        return next(e);
    }
});

// POST /codes/:username
// requires => { name, description, price, image  (optional), created_by }
// returns => { name, description, price, image, id, created_by }
router.post("/:username", async (req, res, next) => {
    try {
        const { name, description, price, image } = req.body;
        const results = await db.query(
            `INSERT INTO codes (created_by, name, description, price, image)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [req.params.username, name, description, price, image]
        );
        const newCode = results.rows[0];
        return res.json({ code : newCode })
    } catch(e) {
        return next(e);
    }
})

// GET /codes/user/:username
router.get("/user/:username", async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM codes WHERE created_by = $1`, [req.params.username])
        return res.json({ codes : results.rows })
    } catch(e) {
        return next(e);
    }
});

// PUT /codes/:id/:username
// authorization required : Same as :username or admin
// returns => { ...updatedCode }
router.put("/:id/:username", async (req, res, next) => {
    try {
        const data = req.body;
        const { setCols, values } = sqlForPartialUpdate(data, {
            createdBy : "created_by",
        });
    
        const idIdx = "$" + (values.length + 1);

        // update codes set (name, description, price, image) set ($1, $2, $3, $4) where id = $6 req.params.id returning 
        const querySQL = `UPDATE codes SET ${setCols} 
        WHERE id= ${idIdx} 
        RETURNING *`
        
        const results = await db.query(querySQL, [...values, req.params.id]);
        if(!results.rows.length) throw new BadRequestError();

        const updatedCode = results.rows[0];
        return res.json({ code : updatedCode });
    } catch(e) {
        return next(e);
    }
});

// DELETE /codes/:id/:username
// authorization required :  same as : username of admin
// returns => { deleted : id }
router.delete("/:id/:username", async (req, res, next) => {
    try {
        const { id, username} = req.params
        const x = await db.query(`DELETE FROM codes WHERE id = $1 AND created_by = $2 returning id`, [id, username]);
        if(!x.rows.length) throw NotFoundError();
        return res.json({ deleted : id });
    } catch(e) {
        return next(e);
    }
});

// POST /codes/:id/:username/like
// returns => { id, created_by, name, description, price, image, likes : [ ] } const likes = code.likes.length;
router.post("/:id/:username/like", async (req, res, next) => {
    try {
        const { id, username } = req.params;
        const like = await db.query(`INSERT INTO likes (code_id, liked_by) VALUES ($1, $2)`, [id, username]);
        const codeResults = await db.query(
            `SELECT * FROM codes WHERE id = $1`, [id]
        );
        const likeResults = await db.query(`select * from likes where code_id = $1`, [id]);
        codeResults.rows[0].likes = likeResults.rows;
        return res.json({ code : codeResults.rows[0] });
    } catch(e) {
        return next(e);
    }
});


module.exports = router;