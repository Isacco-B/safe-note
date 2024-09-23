import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Note = sequelize.define("note", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiresAt: Sequelize.DATE,
  link: Sequelize.STRING,
});

sequelize.sync();

export default Note;
