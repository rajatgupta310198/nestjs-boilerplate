import {Injectable} from '@nestjs/common';
import { AvocadoLogger } from '../../logger/logger';
@Injectable()
export class UserBusinessLogic {
    private logger: AvocadoLogger;
    constructor() {
        this.logger = new AvocadoLogger(UserBusinessLogic.name);
        this.logger.info(`${UserBusinessLogic.name} initiated`);
    }
}
