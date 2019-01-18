export interface IValidation {
       
    value: string;
    validation(): boolean ;
    isEmpty(value:string): boolean;
       
}
