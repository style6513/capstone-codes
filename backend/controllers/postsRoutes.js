const express = require('express');
const router = express.Router();
const db = require('../db/db');
const postsPartialUpdate = require("../helpers/postsPartialUpdate")


// GET posts
// returns {contentsId, contentsTitle, content}
router.get('/', async (req, res, next) => {
    try {
        const posts = await db.query(`SELECT * FROM posts`);
        return res.json({ posts: posts.rows })
    } catch (e) {
        return next(e);
    }
});

// GET/posts/:id
// returns {id,title,content}
router.get("/:id", async (req, res, next) => {
    try {
        const post = await db.query(`SELECT * FROM posts WHERE id = $1`, [req.params.id])
        return res.json({ post: post.rows[0] })
    } catch (e) {
        return next(e);
    }
});

// POST/posts/:username
// requires {title,content,created_by}
// returns {title,content,create_by,id}
router.post("/:username", async (req, res, next) => {
    try {
        const { title, content, created_by } = req.body;
        const results = await db.query(
            `INSERT INTO posts (created_by,title,content)
            VALUES ($1, $2, $3) RETURNING *`,
            [req.params.username, title, content]
        );
        const newPost = results.rows[0];
        return res.json({ post: newPost })
    } catch (e) {
        return next(e);
    }
});

// GET/posts/user/:username
router.get("/user/:username", async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM posts WHERE created_by=$1`, [req.params.username])
        return res.json({ posts: results.rows })
    } catch (e) {
        return next(e);
    }
});

// PUT/posts/:id/:username
router.put("/:id/username", async (req, res, next) => {
    try {
        const data = req.body;
        const { setCols, values } = postsPartialUpdate(data, {
            createdBy: "created_by"
        });
        const idIdx = "$" + (values.length + 1);

        const querySQL = `UPDATE posts SET ${setCols}
        WHERE id=${idIdx}
        RETURNING *`

        const results = await db.query(querySQL, [...values, req.params.id]);
        const updatedPost = results.rows[0];
        return res.json({ post: updatedPost })
    } catch (e) {
        return next(e);
    }
});

// DELETE/posts/:id/:username
// returns {deleted by id}
router.delete("/:id/:username", async (req, res, next) => {
    try {
        const { id, username } = req.params;
        const deletedPost = await db.query(`
        DELETE FROM posts
        WHERE id=$1 AND created_by=$2 returning id`, [id, username]);
        return res.json({ deleted: id })
    } catch (e) {
        return next(e);
    }
});

module.exports = router;