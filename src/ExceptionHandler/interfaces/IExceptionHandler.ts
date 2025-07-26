export interface IExceptionHandler{
    handle(error:any, command?: ()=>void):boolean;
}