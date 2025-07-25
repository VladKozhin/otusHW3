import {IExceptionHandler} from "./IExceptionHandler";

export interface IExceptionProcessor{
    addHandler(handler:IExceptionHandler):void;
    execute(error:any):void;
}