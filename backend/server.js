const app = require("./app");
const { PORT } = require("./config");
app.listen(PORT, () => {
    console.log("starting backend on port " + PORT)
});
