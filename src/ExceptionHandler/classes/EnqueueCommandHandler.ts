import {IExceptionHandler} from "../interfaces/IExceptionHandler";
import {IQueue} from "../interfaces/IQueue";

export class EnqueueCommandHandler implements IExceptionHandler {
    counter:number = 0;
    constructor(private queue: IQueue) {}

    handle(error: any, command: ()=>void): boolean {
        if (command && this.counter == 0) {
            console.log('Повторная постановка в очередь.');
            this.queue.enqueue(command);
            this.counter++;
            return true;
        }
        if(this.counter > 0){
            this.counter = 0;
        }
        return false;
    }
}