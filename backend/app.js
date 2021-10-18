const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const { NotFoundError } = require("./ExpressError");
const { authenticateJWT } = require("./middleware/auth");

// routes imports
const authRoutes = require("./controllers/authRoutes");
const userRoutes = require("./controllers/userRoutes");
const codeRoutes = require("./controllers/codesRoutes");
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(authenticateJWT);

// http://localhost:9000/auth/token
// http://localhost:9000/auth/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/codes", codeRoutes);


// 404 error handler
app.use((req, res, next) => {
    return next(new NotFoundError())
});

// 500 error handler
// catch all in case previous handlers couldn't catch error.
app.use((err, req, res, next) => {
    if(process.env.NODE_ENV !== 'test') {
        console.error(err.stack)
    }

    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error : {
            message,
            status
        }
    })
})

module.exports = app;