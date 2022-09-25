import { Injectable } from '@nestjs/common';
import { AvocadoLogger } from './logger/logger';
import { ConfigService } from './config/config.service';
@Injectable()
export class AppService {
    private readonly logger: AvocadoLogger;
    private readonly configService = new ConfigService();
    constructor() {
        this.logger = new AvocadoLogger(AppService.name);
    }
    getHello(): any {
        this.logger.info(process.env.APP_NAME);
        return {
            appName: process.env.APP_NAME,
            appVersion: this.configService.getAppVersion(),
        };
    }
}
