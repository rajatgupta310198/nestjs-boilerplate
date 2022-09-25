import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { AvocadoLogger } from '../../logger/logger';
@Injectable()
export class UserCommonService {
    private logger: AvocadoLogger;
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
        this.logger = new AvocadoLogger(UserCommonService.name);
    }

    /**
     *
     * @param id MongoId of user
     * @returns User
     */
    public async getUserById(id: string): Promise<any> {
        return this.userModel.findOne({ _id: id });
    }

    public async checkUserExist(params: {
        id?: string;
        email?: string;
    }): Promise<any> {
        const query = {
            id: undefined,
            email: undefined,
        };
        if (!params.id && !params.email) {
            throw {
                message: 'Must send either id or email',
            };
        }
        if (params.id) {
            query.id = params.id;
        }
        if (params.email) {
            query.email = params.email;
        }
        if (!params.email) {
            delete query.email;
        }
        if (!params.id) {
            delete params.id;
        }
        return await this.userModel
            .findOne(query)
            .then(user => {
                if (user !== null && user !== undefined) {
                    return user;
                }
                return false;
            })
            .catch(err => {
                this.logger.error(err);
                throw err;
            });
    }
}
