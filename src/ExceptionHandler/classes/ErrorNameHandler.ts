import {IExceptionHandler} from "../interfaces/IExceptionHandler";

export class ErrorNameHandler implements IExceptionHandler {
    private name:string = "";

    constructor(name: string) {
        this.name = name;
    }

    handle(error: any, command:()=>void): boolean {
        if (error instanceof Error && error.name === this.name) {
            console.log(`Обработка ошибки с именем: "${this.name}"`);
            return true;
        }
        return false;
    }
}