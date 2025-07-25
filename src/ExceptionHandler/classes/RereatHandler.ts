import {IExceptionHandler} from "../interfaces/IExceptionHandler";

export class RepeatHandler implements IExceptionHandler{
    private func:()=>void;
    private count:number;

    constructor(func:()=>void, count:number) {
        this.func = func;
        this.count = count;
    }

    handle(error: any): boolean {
        if (!this.func) {
            return false;
        }

        let attempts = 0;
        while (attempts < this.count) {
            try {
                this.func();
                return true;
            } catch (err) {
                attempts++;
                if (attempts >= this.count) {
                    return false;
                }
            }
        }
        return false; // на всякий случай
    }
}