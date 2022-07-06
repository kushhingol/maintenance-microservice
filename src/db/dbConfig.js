const dbConfig = {
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    options: {
        trustedConnection: true,
    }
};


module.exports = dbConfig;