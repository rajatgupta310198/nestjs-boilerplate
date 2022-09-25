import * as dotenv from 'dotenv';

export interface EnvConfig {
    [key: string]: string;
}
/**
 * @name - ConfigService
 * Custom config service for more flexibility
 */
export class ConfigService {
    /**
     *
     * @param filePath File path of env file
     */
    constructor() {
        const config = dotenv.config({
            path: `.${process.env.NODE_ENV || 'development'}.env`,
        });
    }

    /**
     * Get value of environment variable
     * @param key Environment variable key
     * @returns value string
     */
    public get(key: string): string {
        return process.env[key];
    }

    /**
     * @returns node environment
     */
    public getEnv(): string {
        return process.env.NODE_ENV !== undefined
            ? process.env.NODE_ENV
            : 'development';
    }

    public getAppVersion(): string {
        return String(process.env.APP_VERSION);
    }

    /**
     * @returns Mongo connection string
     */
    public getMongoConnectionUrl(): string {
        let connString;
        connString = `mongodb://${process.env.MONGO_USER}:${
            process.env.MONGO_USER_PASS
        }@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`;
        // tslint:disable-next-line:no-console
        console.log(connString);
        return connString;
    }
}
