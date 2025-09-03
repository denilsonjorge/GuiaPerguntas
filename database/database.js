import { Sequelize } from "sequelize";

const connection=new Sequelize("guiaperguntas","root","1234",{
    host:"localhost",
    dialect:"mysql"
})
export default connection