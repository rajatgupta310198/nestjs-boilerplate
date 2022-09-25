import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import {DatabaseModule} from './database/database.module';
import {ConfigService} from './config/config.service';
import { UserModule } from './modules/user/user.module';
// import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [

        ConfigModule,
        DatabaseModule,
        UserModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
})
export class AppModule {}
