import {ExceptionProcessor} from "./src/ExceptionHandler/classes/ExceptionProcessor";
import {ErrorNameHandler} from "./src/ExceptionHandler/classes/ErrorNameHandler";
import {LogErrorHandler} from "./src/ExceptionHandler/classes/LogErrorHandler";
import {RepeatHandler} from "./src/ExceptionHandler/classes/RereatHandler";
import {Queue} from "./src/ExceptionHandler/classes/Queue";
import {EnqueueCommandHandler} from "./src/ExceptionHandler/classes/EnqueueCommandHandler";

function errorThrower(){
    throw "Log me."
}
function errorThrower2(){
    console.log("Second func")
    throw "Error code: 222!"
}
function errorThrower3(){
    console.log("Third func")
    throw "Error code: 333!"
}

const queue = new Queue();

const processor = new ExceptionProcessor();
processor.addHandler(new RepeatHandler(errorThrower, 1));
processor.addHandler(new LogErrorHandler());
//processor.addHandler(new EnqueueCommandHandler(queue))
//processor.addHandler(new LogErrorHandler());


queue.enqueue(errorThrower)
//queue.enqueue(errorThrower2)
//queue.enqueue(errorThrower3)
//queue.enqueue(()=>{console.log("И я из очереди!")})
//queue.runQueue();

while(queue.count() > 0) {
    try {
        queue.execute();
    } catch (error) {
        processor.process(error, queue.getCurrentFunc);
    }
}