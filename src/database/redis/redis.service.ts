import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AvocadoLogger } from '../../logger/logger';
import { RedisEnum } from './redis.constants';

@Injectable()
export class RedisService {
    private logger: AvocadoLogger;
    constructor(
        @Inject(RedisEnum.REDIS_CONNECTION) private redisClient: RedisClientType,
    ) {
        this.logger = new AvocadoLogger(RedisService.name);
    }

    /**
     * Set's the string value of payload against given key
     * @param key - Key for setting data
     * @param payload - payload you want to store
     * @returns Promise<boolean> true or false
     */
    public set(key: string, payload: any): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await this.redisClient.set(key, JSON.stringify(payload));
            resolve(true);
            // this.redisClient
            // this.redisClient.set(key, JSON.stringify(payload), (err, reply) => {
            //     if (err) {
            //         this.logger.error(err);
            //         reject(false);
            //     }
            //     this.logger.info(reply);
            //     resolve(true);
            // });
        });
    }

    /**
     * Gets the value stored against given key
     * @param key - Key for getting stored payload
     * @returns Promise<any> - Value as pared JSON
     */
    public get(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.redisClient.get(key).then(reply => resolve(JSON.parse(reply))).catch(err => {
                this.logger.error(err);
                resolve(false);
            });
        });
    }
}
