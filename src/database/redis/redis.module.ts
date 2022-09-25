import { Global, Module } from '@nestjs/common';
import { RedisConnection } from './redis.provider';
import { RedisService } from './redis.service';
/**
 * Redis Module
 */
@Global()
@Module({
    providers: [...RedisConnection, RedisService],
    exports: [RedisService],
})
export class RedisModule {}
