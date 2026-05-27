import { env } from "process";

require("dotenv").config({quiet: true});

const config={
    port: env.PORT as string,
    database_url:env.DB_URL as string
}
export default config;