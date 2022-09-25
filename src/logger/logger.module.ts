import { Module } from '@nestjs/common';
import { AvocadoLogger } from './logger';

@Module({
    providers: [AvocadoLogger],
    exports: [AvocadoLogger],
})
export class LoggerModule {}
