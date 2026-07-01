import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.host,
    }
);

export default sequelize;
