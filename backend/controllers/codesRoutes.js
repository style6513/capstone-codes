const express = require("express");
const router = express.Router();
const {  ensureCorrectUserOrAdmin } = require("../middleware/auth");
const db = require("../db/db");
const { NotFoundError, BadRequestError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate");

// GET codes/
// returns => [ { codeid, codename, description, }, { } ]
router.get("/",  async (req, res, next) => {
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
router.get("/:id",  async (req, res, next) => {
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
router.post("/:username",  async (req, res, next) => {
    try {
        const { name, description, price, image } = req.body;
        const res = await db.query(
            `INSERT INTO codes (created_by, name, description, price, image)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [req.params.username, name, description, price, image]
        );
        const newCode = res.rows[0];
        return res.json({ code : newCode })
    } catch(e) {
        return next(e);
    }
})

// PUT /codes/:id/:username
// authorization required : Same as :username or admin
// returns => { ...updatedCode }
router.put("/:id/:username",  async (req, res, next) => {
    try {
        const data = req.body;
        const { setCols, values } = sqlForPartialUpdate(data, {
            createdBy : "created_by",
        });
        const createdByIdx = "$" + (values.length + 1);
        const querySQL = `UPDATE codes SET ${setCols} WHERE created_by = ${createdByIdx} RETURNING *`
        const results = await db.query(querySQL, [...values, req.params.username]);
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
router.delete("/:id/:username",  async (req, res, next) => {
    try {
        const { id, username} = req.params
        const x = await db.query(`DELETE FROM codes WHERE id = $1 AND created_by = $2 returning id`, [id, username]);
        if(!x.rows.length) throw NotFoundError();
        return res.json({ deleted : id });
    } catch(e) {
        return next(e);
    }
});

module.exports = router;