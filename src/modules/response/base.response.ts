import {Expose, Exclude, plainToInstance} from 'class-transformer';

export class BaseResponse<T> {
    public statusCode: number;
    public message: string;
    public data?: T | T [];

    constructor(_class: new () => T, statusCode: number, message: string, data?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = plainToInstance(_class, data);
    }
}

// tslint:disable-next-line:max-classes-per-file
@Exclude()
export class PingResponse {
    @Expose()
    public appName: string;
    @Expose()
    public appVersion: string;
}
