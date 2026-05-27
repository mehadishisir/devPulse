import app from "./app";
import config from "./config";
import { initDB } from "./DB";

const main = async()=>{
    await initDB();
    app.listen(config.port,()=>{
    console.log("Server is running on port " + config.port);
})
}

main();