import cron from "node-cron";
import Note from "./models/notes.model.js";
import { Op } from "sequelize";

async function deleteExpiredNotes() {
  try {
    const currentTime = new Date();
    const result = await Note.destroy({
      where: {
        expiresAt: {
          [Op.lt]: currentTime,
        },
      },
    });
    console.log(`${result} expired note(s) deleted.`);
  } catch (error) {
    console.error("Error deleting expired notes:", error);
  }
}

function startCronJobs() {
  cron.schedule("*/1 * * * *", () => {
    console.log("Running cron job to delete expired notes...");
    deleteExpiredNotes();
  });
}

export { startCronJobs };
