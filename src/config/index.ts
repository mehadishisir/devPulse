import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT as string,
    database_url: process.env.DATABASE_URL as string,
    jwt_secret_key: process.env.JWT_SECRET_KEY as string
};

export default config;