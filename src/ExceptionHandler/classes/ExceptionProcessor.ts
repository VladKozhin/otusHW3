import {IExceptionHandler} from "../interfaces/IExceptionHandler";

class ExceptionProcessor {
    private handlers: IExceptionHandler[] = [];

    addHandler(handler: IExceptionHandler) {
        this.handlers.push(handler);
    }

    process(error: any): void {
        for (const handler of this.handlers) {
            if (handler.handle(error)) {
                break;
            }
        }
    }
}