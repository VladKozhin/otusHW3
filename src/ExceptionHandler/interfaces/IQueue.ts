export interface IQueue{
    enqueue(command:()=>void):void;
    execute():void;
    count():number;
    getCurrentFunc():()=>void;
}