import { Injectable } from '@angular/core';
import { IUser } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [];
  constructor() { }
  public getUser(): IUser[]{
   
    let getJsonUser = localStorage.getItem("Users");
    if (getJsonUser){
      this.users = JSON.parse(getJsonUser);
    }
    return this.users;
  }
  public addUser(users){
    console.log("adasdlkasslkdsa")
    localStorage.setItem("User", JSON.stringify(users)) ;
  }
}
