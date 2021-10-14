import { createConnection } from "typeorm";

export async function connect() {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 9669,
            username: "postgres",
            database: "postgres",
            password: "raptor315",
            entities: ["build/database/entities/**/*.js"],
            synchronize: true
        });
        console.log("DB is connected!");
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

