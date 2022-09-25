import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {IUser, IUserCreate, User} from './interface/user.interface';
import {AvocadoLogger} from '../../logger/logger';
import {UserControllerFilterDto} from './dto/user.filters.dto';
import {UserBusinessLogic} from './user.business.logic.service';

@Injectable()
export class UserService {
    private logger: AvocadoLogger;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly userBusinessLogic: UserBusinessLogic,
    ) {
        this.logger = new AvocadoLogger(UserService.name);
    }

    /**
     * Function implements logic to create user
     * @param user - User Interface
     */
    public async createUser(user: IUserCreate): Promise<IUser> {
        this.logger.info('Creating user');
        return await this.userModel.create(user);
    }

    /**
     *
     * @param id MongoId of user
     * @returns User
     */
    public async getUserById(id: string): Promise<IUser> {
        return this.userModel.findOne({ _id: id });
    }

    public async getUsers(filters: UserControllerFilterDto): Promise<IUser[]> {
        return await this.userModel
            .find()
            .limit(Number(filters.pageNumber))
            .then(docs => {
                if (docs.length) {
                    return docs.map(d => d.toJSON());
                } else {
                    return [];
                }
            });
    }
}
