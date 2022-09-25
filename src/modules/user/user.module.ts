import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './collections';
import { ConfigModule } from '../../config/config.module';
import { UserCommonService } from './user.common.service';
import { UserBusinessLogic } from './user.business.logic.service';
import {DatabaseModule} from '../../database/database.module';
/**
 * User module
 */
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserModel.modelName,
                schema: UserModel.schema,
                collection: UserModel.collectionName,
            },
        ]),
        ConfigModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserCommonService, UserBusinessLogic],
    exports: [UserCommonService],
})
export class UserModule {}
