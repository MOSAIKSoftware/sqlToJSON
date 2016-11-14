sqlToJSON
=========

Fires SQL-Querys and writes their results into JSON files in a specified directory.

How to use:
----------

You can use this as a grunt task (see ./Gruntfile.js) and also as a standalone
library (see ./example/index.js).  
For testing purposes you can start the sample database via:
- `docker-compose build`
- `docker-compose up`


The important configurations are in `./config.json` (for the standalone use) or directly in the `Gruntfile.js`.
You have to edit these configurations.

Example for Gruntfile.js:
--------

```
sqlToJSON: {
            default_options: {
                options: {
                    "sql": {
                        "host": "localhost",
                        "port": 6603,
                        "user": "mosaik",
                        "password": "nochgeheimer",
                        "database": "mosaiktest"
                    },
                    "outputPath": "./json",
                    "querys": [
                        {
                            "filename": "a.json",
                            "query": "select * from mosaiktest.menschen"
                        },
                        {
                            "filename": "b.json",
                            "query": "select name from mosaiktest.menschen"
                        },
                        {
                            "filename": "c.json",
                            "query": "select vorname from mosaiktest.menschen"
                        },
                        {
                            "filename": "d.json",
                            "query": "select vorname from mosaiktest.menschen where vorname LIKE 'tolga'"
                        }
                    ]
                }
            }
        }
```

You can write you querys in the `querys` array and also specify an output filename for the result of the query.
The `outputPath` has to exist. Otherwise the application will crash.  
The `sql` options should be set appropriate.