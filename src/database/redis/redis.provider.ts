import {createClient, RedisClientType} from 'redis';
import { ConfigService } from '../../config/config.service';
import { AvocadoLogger } from '../../logger/logger';
import { ConfigModule } from '../../config/config.module';
import { RedisEnum } from './redis.constants';
const logger = new AvocadoLogger(RedisEnum.REDIS_CONNECTION);

/**
 * Redis connection provider
 */
export const RedisConnection = [
    {
        imports: [ConfigModule],
        provide: RedisEnum.REDIS_CONNECTION,
        useFactory: async (configService: ConfigService): Promise<RedisClientType> => {
            const client: RedisClientType = createClient({url: configService.get('REDIS_URL')});
            await client.connect();
            client.on('connect', () => {
                logger.info('Redis is now connected');
            });
            client.on('error', err => {
                logger.error('Error raised');
                logger.error(err);
            });

            return client;
        },
        inject: [ConfigService],
    },
];
