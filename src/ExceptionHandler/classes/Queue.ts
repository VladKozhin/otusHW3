import {IQueue} from "../interfaces/IQueue";

export class Queue implements IQueue{
    private queue: (()=>void)[] = [];

    enqueue(command: ()=>void) {
        this.queue.push(command);
    }

    execute() {
        const command = this.queue.shift();
        if (command) {
            command();

        }
    }

    getCurrentFunc(){
        console.log("Func: " + this.queue.pop())
        return this.queue.pop()
    }

    count():number{
        return this.queue.length
    }
}