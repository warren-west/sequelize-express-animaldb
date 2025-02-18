class ReportService {
    constructor(db) {
        this.client = db.sequelize
        this.scripts = require('../data/Reports.json').scripts
    }

    async fireCustomSql(scriptName) {
        // find the required script based on the function input
        const requiredScript = this.scripts.find(script => script.name == scriptName)

        // make sure a match was found
        if (!requiredScript)
            return null

        // execute the script SQL on the sequelize object and return the results
        return this.client.query(requiredScript, {
            raw: true,
            type: this.client.QueryTypes.SELECT
        })
    }
}

module.exports = ReportService