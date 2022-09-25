import { Request, Response } from 'express';
import * as morgan from 'morgan';
import { AvocadoLogger } from '../logger/logger';
const logger = new AvocadoLogger('RequestLogger');
export const requestLoggerMiddleware = (
    req: Request,
    res: Response,
    next: Function,
) => {
    morgan('combined', {
        stream: {
            write: logger.info.bind(logger),
        },
    })(req, res, next);
};
