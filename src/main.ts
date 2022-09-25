import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AvocadoLogger } from './logger/logger';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ValidationPipe } from './extra/validation.pipe';
import { requestLoggerMiddleware } from './middlewares';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });

    const configService = app.select(ConfigModule).get(ConfigService);

    /**
     * Logger initialization for the file
     */
    const logger = new AvocadoLogger(bootstrap.name);

    /**
     * Request logger
     * We are using morgan request logger
     */
    app.use(requestLoggerMiddleware);


    /*
    * Swagger
    * */
    const config = new DocumentBuilder()
                        .setTitle('Nest Boilerplate')
                        .setDescription('Nest boilerplate APIs')
                        .setVersion(`${configService.getAppVersion()}`)

                        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // app.use(new ValidationPipe());

    /**
     * Validation pipe for incoming data
     */
    app.useGlobalPipes(new ValidationPipe());
    await app
        .listen(Number(configService.get('PORT')))
        .then(() => {
            logger.info('================================================');
            logger.info(`App Name       : ${configService.get('APP_NAME')}`);
            logger.info(`App Version    : ${configService.getAppVersion()}`);
            logger.info(`Running Port   : ${configService.get('PORT')}`);
            logger.info(`Environment    : ${configService.getEnv()}`);
            logger.info('================================================');
        })
        .catch(err => {
            logger.error(err);
        });
    /**
     * Hot reloading app
     */
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
