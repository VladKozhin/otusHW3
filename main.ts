

//const rep = new Repeatable(log, 3);
//rep.repeatCommand()

/*type Command = () => void;

class CommandQueue {
    private commands: { command: Command; name?: string }[] = [];

    // Добавляем команду в очередь
    enqueue(command: Command, name?: string) {
        this.commands.push({ command, name });
    }

    // Запускаем все команды по очереди
    async runAll() {
        for (const { command, name } of this.commands) {
            try {
                // Если команда асинхронная, можно использовать await
                await command();
            } catch (error) {
                ExceptionHandler.handle(error, name);
            }
        }
    }
}


const queue = new CommandQueue();

// Добавляем синхронные команды
queue.enqueue(() => {
    console.log('Команда 1 выполнена');
});

queue.enqueue(() => {
    throw new Error('Ошибка в команде 2');
}, 'Команда 2');

queue.enqueue(async () => {
    // Асинхронная команда
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Асинхронная команда 3 выполнена');
}, 'Команда 3');

queue.enqueue(() => {
    throw new Error('Ошибка в команде 4');
}, 'Команда 4');

// Запускаем очередь
queue.runAll().then(() => {
    console.log('Все команды выполнены');
});*/