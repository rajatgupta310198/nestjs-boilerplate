import { IsEmail, IsString, IsAlphanumeric } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    public name: string;
    @ApiProperty()
    @IsEmail()
    public email: string;
    @ApiProperty()
    @IsAlphanumeric()
    public password: string;
}
