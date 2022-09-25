import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse, PingResponse } from './modules/response';
import { plainToInstance } from 'class-transformer';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * @returns Json response
     */
    @Get()
    getHello(): BaseResponse<PingResponse> {
        return new BaseResponse(
            PingResponse,
            HttpStatus.OK,
            'Pong',
            this.appService.getHello(),
        );
    }
}
