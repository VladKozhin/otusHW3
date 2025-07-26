import {IExceptionHandler} from "../interfaces/IExceptionHandler";

export class LogErrorHandler implements IExceptionHandler {
    handle(error: any, command:()=>void): boolean {
        console.log(`При выполнении кода возникла ошибка: ${error}`);
        return true;
    }
}