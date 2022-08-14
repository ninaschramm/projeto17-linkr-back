import dotenv from "dotenv";
import chalk from "chalk";
import server from "./app.js";


dotenv.config();


const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(chalk.bold.green(`Server is listening on ${PORT}`));
});