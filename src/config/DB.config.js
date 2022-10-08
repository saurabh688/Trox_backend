module.exports = {
    HOST_LOCAL: "localhost",
    USER_LOCAL: "root",
    PASSWORD_LOCAL: "Password_123_!",
    DB_LOCAL: "trox",

    HOST_STAGE: "",
    USER_STAGE: "",
    PASSWORD_STAGE: "",
    DB_STAGE: "trox",

    HOST_PROD: "",
    USER_PROD: "",
    PASSWORD_PROD: "",
    DB_PROD: "trox",

    dialect: "mysql",
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}