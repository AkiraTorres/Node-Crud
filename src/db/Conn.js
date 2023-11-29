import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const POSTGRES_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB}`;
const sequelize = new Sequelize(POSTGRES_URL);

async function connection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export { connection, sequelize, DataTypes, Sequelize };