import * as test from "node:test";
import {Queue} from "./src/ExceptionHandler/classes/Queue";
import {ExceptionProcessor} from "./src/ExceptionHandler/classes/ExceptionProcessor";
import {RepeatHandler} from "./src/ExceptionHandler/classes/RereatHandler";
import {LogErrorHandler} from "./src/ExceptionHandler/classes/LogErrorHandler";
import {EnqueueCommandHandler} from "./src/ExceptionHandler/classes/EnqueueCommandHandler";

it('Проверка логирования исключения', () => {
    const logSpy = jest.spyOn(console, 'log')

    function errorThrower(){
        throw "Log me."
    }

    const queue = new Queue();
    const processor = new ExceptionProcessor();
    processor.addHandler(new LogErrorHandler());

    queue.enqueue(errorThrower)

    while(queue.count() > 0) {
        try {
            queue.execute();
        } catch (error) {
            processor.process(error, queue.getCurrentFunc);
        }
    }
    expect(logSpy).toHaveBeenCalledWith('При выполнении кода возникла ошибка: Log me.');
});

it('Проверка повторной постановки команды в очередь', () => {
    const logSpy = jest.spyOn(console, 'log')

    function errorThrower(){
        throw "Re-enqueue me."
    }

    const queue = new Queue();
    const processor = new ExceptionProcessor();
    processor.addHandler(new EnqueueCommandHandler(queue));

    queue.enqueue(errorThrower)

    while(queue.count() > 0) {
        try {
            queue.execute();
        } catch (error) {
            processor.process(error, queue.getCurrentFunc);
        }
    }
    expect(logSpy).toHaveBeenCalledWith('Повторная постановка в очередь.');
});

it('Проверка, что проблемная функция повторяется 3 раза', () => {
    const logSpy = jest.spyOn(console, 'log')

    function errorThrower(){
        throw "Repeat me."
    }

    const queue = new Queue();
    const processor = new ExceptionProcessor();
    processor.addHandler(new RepeatHandler(errorThrower, 3));

    queue.enqueue(errorThrower)

    while(queue.count() > 0) {
        try {
            queue.execute();
        } catch (error) {
            processor.process(error, queue.getCurrentFunc);
        }
    }
    expect(logSpy).toHaveBeenCalledWith('Повтор №1...');
    expect(logSpy).toHaveBeenCalledWith('Повтор №2...');
    expect(logSpy).toHaveBeenCalledWith('Повтор №3...');
});

it('Повтор и логирование', () => {
    const logSpy = jest.spyOn(console, 'log')

    function errorThrower(){
        throw "Repeat me."
    }

    const queue = new Queue();
    const processor = new ExceptionProcessor();
    processor.addHandler(new RepeatHandler(errorThrower, 1));
    processor.addHandler(new LogErrorHandler());

    queue.enqueue(errorThrower)

    while(queue.count() > 0) {
        try {
            queue.execute();
        } catch (error) {
            processor.process(error, queue.getCurrentFunc);
        }
    }
    expect(logSpy).toHaveBeenCalledWith('Повтор №1...');
    expect(logSpy).toHaveBeenCalledWith('При выполнении кода возникла ошибка: Log me.');
});