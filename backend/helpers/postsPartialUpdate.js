const { BadRequestError } = require("../ExpressError");

function postsPartialUpdate(dataToUpdate, jsTosql) {
    const keys = Object.keys(dataToUpdate);
    if(keys.length ===0) throw new BadRequestError("No data");
    const cols = keysmap((colName,idx)=>`"${jsToSql[colName] || colName}"=$${idx + 1}`)
    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate)
    }
};

module.exports = postsPartialUpdate ;