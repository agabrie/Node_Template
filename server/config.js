require("dotenv").config();
let env = process.env;
let ports = {
    server : env.SERVER_PORT || 4000,
    db:env.DB_PORT||3000,
}
let client = {
    uri:env.CLIENT_URI,
}
let server = {
    host:env.SERVER_HOST,
    port:env.SERVER_PORT,
    limit:env.SERVER_REQUEST_SIZE || '2mb',
}
let db={
    user:env.DB_USER,
    password:env.DB_PASSWORD,
    host:env.DB_HOST,
    port:env.DB_PORT,
    name:env.DB_NAME,
    uri:env.DB_URL,
}

let config={
    ports,client,server,db
}

module.exports = config;