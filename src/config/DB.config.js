module.exports = {
    HOST_LOCAL: "3.91.158.108",
    USER_LOCAL: "trox",
    PASSWORD_LOCAL: "Password_123_!",
    DB_LOCAL: "trox",

    HOST_STAGE: "3.91.158.108",
    USER_STAGE: "trox",
    PASSWORD_STAGE: "Password_123_!",
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