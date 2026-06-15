import { env } from "process";
require("dotenv").config({ quiet: true });
const config = {
    port: env.PORT,
    database_url: env.DB_URL,
    jwt_secret_key: env.JWT_SECRET_KEY
};
export default config;
//# sourceMappingURL=index.js.map