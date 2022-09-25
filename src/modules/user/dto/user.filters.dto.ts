import { IsString } from 'class-validator';

export class UserControllerFilterDto {
    // @IsOptional()
    @IsString()
    public pageNumber: number = 1; // default is 1
    @IsString()
    public pageSize: number = 10; // default is 10
}
