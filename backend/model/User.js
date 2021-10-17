const db = require("../db/db");
const bcrypt = require("bcrypt");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    /**  authenticate user with username, password.
     * Returns { username, first_name, last_name, email, is_admin }
     * Throws UnauthorizedError if user not found or wrong password.
     * */
    static async authenticate(username, password) {
        const results = await db.query(
            `SELECT username, password, email, is_admin AS "isAdmin" FROM users WHERE username = $1`,
            [username]
        );
        const user = results.rows[0];
        if (user) {
            const isValid = await bcrypt.compare(password, user.password); // true or fasle
            if (isValid) {
                delete user.password;
                return user; // { username, email, isAdmin,  }
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    /**
     * Register user with data.
     * Returns { username, firstName, lastName, email, isAdmin }
     * Throws BadRequestError on duplicates.
     */
    static async register({
        username,
        email,
        password,
        isAdmin,
    }) {
        const duplicateCheck = await db.query(
            `SELECT username FROM users WHERE username = $1`,
            [username]
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username : ${username}`);
        }
        
        const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const results = await db.query(
            `INSERT INTO users (username, email, password, is_admin)
          VALUES ($1, $2, $3, $4)
          RETURNING username, email, is_admin AS "isAdmin"`,
        [username, email, hashedPW, isAdmin]
        );
        const user = results.rows[0];
        return user;
    }


    /**Given a username, return data about the user.
     * Returns { username, email, firstName, lastName, isAdmin }
     * Throws NotFoundError if the user is not found.
     */
    static async get(username) {
        const userResults = await db.query(
            `SELECT 
        username, 
        email, 
        is_admin AS "isAdmin"
          FROM users WHERE username = $1`,
            [username]
        );
        const user = userResults.rows[0];
        if (!user) {
            throw new NotFoundError(`No user : ${username}`);
        }
        return user;
    }

    /**
     * Update user data with `data`
     * This is a "partial update" -- it's fine if data doesn't contain all the fields; this only changes the provided ones.
     * Data can include :
     *   { username, email, password, firstName, lastName, isAdmin }
     *
     * Throws NotFoundError if not found.
     *
     * WARNING: this function can set a new password or make a user an admin.
     * Callers of this function must be certain they have validated inputs to this
     */
    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
        const { setCols, values } = sqlForPartialUpdate(data, {
            firstName: "first_name",
            lastName: "last_name",
            isAdmin: "is_admin",
        });
        const usernameVarIdx = "$" + (values.length + 1);
        const querySQL = `UPDATE users
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    email,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    is_admin AS "isAdmin"`;
        const results = await db.query(querySQL, [...values, username]);
        const user = results.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);
        delete user.password;
        return user;
    }


}

module.exports = User;