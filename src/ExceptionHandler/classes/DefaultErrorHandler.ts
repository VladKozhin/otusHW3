import {IExceptionHandler} from "../interfaces/IExceptionHandler";

export class DefaultErrorHandler implements IExceptionHandler {
    handle(error: any): boolean {
        console.log('Обработка по умолчанию:', error);
        return true;
    }
}