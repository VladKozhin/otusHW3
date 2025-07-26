import {IExceptionHandler} from "../interfaces/IExceptionHandler";

export class ExceptionProcessor {
    private handlers: IExceptionHandler[] = [];

    addHandler(handler: IExceptionHandler) {
        this.handlers.push(handler);
    }

    process(error: any, command:()=>void): void {
        for (const handler of this.handlers) {
            if (handler.handle(error, command)) {
                break;
            }
        }
    }
}