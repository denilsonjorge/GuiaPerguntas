import { Sequelize } from "sequelize";
import connection from "./database.js";


export const Responsta=connection.define("responstas",{
    corpo:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull:false,
    }
})
Responsta.sync({force:false})