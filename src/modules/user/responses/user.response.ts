import { Exclude, Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class UserResponse {
    @ApiProperty()
    @Expose({ name: '_id' })
    public id: string;
    @ApiProperty()
    @Expose()
    public name: string;
}
