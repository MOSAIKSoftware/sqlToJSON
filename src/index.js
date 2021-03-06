var mysql = require('promise-mysql');
var jsonfile = require('jsonfile');
var path = require('path');
var fs = require('fs');


function initDatabase(config) {
    console.log("starting database connection...");

    return mysql.createConnection({
        host: config.sql.host,
        port: config.sql.port,
        user: config.sql.user,
        password: config.sql.password,
        database: config.sql.database
    })
}

function closeDatabase(db) {
    console.log("closing database connection...");
    db.end();
}


function callQuery(db, p_query, p_filename, config) {
    return db.query(p_query).then(rows => {
        "use strict";
        writeFile(path.join(config.outputPath, p_filename), rows);
    });
}


function writeFile(pathToFile, jsonContent) {
    jsonfile.writeFileSync(pathToFile, jsonContent, {spaces: 2});
    console.log("success: file written to " + pathToFile);
}


function checkOutputDir(outputDir) {
    if (!fs.existsSync(outputDir)) {
        throw new Error(`ERROR: ${outputDir} does not exist!`);
    }
}


module.exports = function (configObject) {
    let database = undefined;
    let querys = configObject.querys;

    return initDatabase(configObject)
        .then(connection => {
            "use strict";
            database = connection;
            checkOutputDir(configObject.outputPath);

            let promises = [];

            for (let i = 0; i < querys.length; i++) {
                console.log(querys[i].query);
                promises.push(callQuery(database, querys[i].query, querys[i].filename, configObject));
            }

            return Promise.all(promises)
                .then(()=> {
                    "use strict";
                    closeDatabase(database);
                });

        });
};