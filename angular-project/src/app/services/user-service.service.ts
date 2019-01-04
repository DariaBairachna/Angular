import { Injectable } from '@angular/core';
import { IUser } from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [];
  constructor() { }
  public getUsers(): IUser[]{

    let getJsonUser = localStorage.getItem("User");
    if (getJsonUser){
      this.users = JSON.parse(getJsonUser);
    }
    return this.users;
  }
  public saveUsers(users):void{
     localStorage.setItem("User", JSON.stringify(users)) ;
  }
}
