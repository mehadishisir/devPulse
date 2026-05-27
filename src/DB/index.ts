import { neon } from "@neondatabase/serverless";
import config from "../config"


export const sql = neon(config.database_url);



export const initDB =async() => {
    
  await sql`
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hash_password VARCHAR(200) NOT NULL,
    role VARCHAR (20) DEFAULT 'contributor' CHECK (role IN ('contributor','maintainer')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
  `;
  console.log ("user table created")

  // issue table

    await sql`
            CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature_request')),
                status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
                reporter_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `;
        console.log(' Issues table created');
    

}