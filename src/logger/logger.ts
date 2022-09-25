import * as path from 'path';
import {
    createLogger,
    transports,
    LeveledLogMethod,
    configure,
    format,
} from 'winston';

import * as winston from 'winston';

const levels = {
    error: 'error',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug',
    silly: 'silly',
};

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const errorStackFormat = winston.format(info => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            stack: info.stack,
            message: info.message,
        });
    }
    return info;
});
configure({
    transports: [
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: format.combine(
                format.colorize(),
                format.label({ label: 'avocado-user' }),
                winston.format.timestamp(),
                errorStackFormat(),
                myFormat,
            ),
        }),
    ],
    exitOnError: false,
});

export class AvocadoLogger {
    private static parsePathToScope(filepath: string): string {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '');
            filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
            filepath = filepath.replace('.ts', '');
            filepath = filepath.replace('.js', '');
            filepath = filepath.replace(path.sep, ':');
        }
        return filepath;
    }

    private scope: string;

    constructor(scope?: string) {
        this.scope = AvocadoLogger.parsePathToScope(scope || 'migration_v2');
    }

    public formatLogArguments(args: any): any {
        args = Array.prototype.slice.call(args);
        const stackInfo = this.getStackInfo(1);
        return stackInfo[3];
    }

    public getStackInfo(stackIndex: number): any {
        // @ts-ignore
        const stackList = new Error().stack.split('\n').slice(3);
        const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
        const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

        const s = stackList[stackIndex] || stackList[0];
        const sp = stackReg.exec(s) || stackReg2.exec(s);
        // console.log(sp);

        if (sp && sp.length === 5) {
            return sp;
        }
    }

    public debug(message: any, ...args: any[]): void {
        const lineNo = this.formatLogArguments(args);
        args.push(lineNo);
        this.log(levels.debug, message, args);
    }

    public info(message: any, ...args: any[]): void {
        const lineNo = this.formatLogArguments(args);
        args.push(lineNo);
        this.log(levels.info, message, args);
    }

    public error(message: any, ...args: any[]): void {
        const lineNo = this.formatLogArguments(args);
        args.push(lineNo);
        this.log(levels.error, message, args);
    }

    private log(level: string, message: any, args: any[]): void {
        this.getLoggerInstance(level)(
            `[${args[args.length - 1]}] ${this.formatScope()} ${JSON.stringify(
                message,
                undefined,
                3,
            )}`,
        );
    }

    private getLoggerInstance(level: string): LeveledLogMethod {
        if (levels.info === level) {
            return winston.info;
        }

        if (levels.debug === level) {
            return winston.debug;
        }

        if (levels.error === level) {
            return winston.error;
        }

        return winston.info;
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }
}
