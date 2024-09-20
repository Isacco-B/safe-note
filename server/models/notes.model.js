import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Note = sequelize.define("note", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  encrypted: Sequelize.BOOLEAN,
  expiresAt: Sequelize.DATE,
  link: Sequelize.STRING,
  viewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync();

export default Note;
