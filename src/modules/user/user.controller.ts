import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
    Query,
    HttpException,
    Param,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { UserResponse } from './responses/user.response';
import { BaseResponse } from '../response';
import { AvocadoLogger } from '../../logger/logger';
import { UserControllerFilterDto } from './dto/user.filters.dto';
import { ValidationPipe } from '../../extra/validation.pipe';
import { IError } from '../../interfaces';
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    private logger: AvocadoLogger;

    constructor(private readonly userService: UserService) {
        this.logger = new AvocadoLogger(UserController.name);
    }

    /**
     *  API to create user
     * @returns API response
     * @param user
     */
    @UsePipes(ValidationPipe)
    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: UserResponse,
        description: 'Created user response',
    })
    async createUser(@Body() user: UserCreateDto): Promise<BaseResponse<UserResponse>> {
        return await this.userService
            .createUser(user)
            .then(createdUser => {
                this.logger.info(`Created user with ID ${createdUser._id}`);
                return new BaseResponse<UserResponse>(
                    UserResponse,
                    HttpStatus.CREATED,
                    'Created user',
                    createdUser,
                );
            })
            .catch((err: IError) => {
                throw new HttpException(err, err.statusCode);
            });
    }
}
