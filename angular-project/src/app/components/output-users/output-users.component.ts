import { Component, OnInit } from '@angular/core';
import { IUser } from "../../interface/user";
import { UserService } from "../../services/user-service.service";
@Component({
  selector: 'app-output-users',
  templateUrl: './output-users.component.html',
  styleUrls: ['./output-users.component.scss']
})
export class OutputUsersComponent implements OnInit {
  public userService: UserService;
  public users: IUser[];
  constructor() {
    this.userService = new UserService();
    this.users = this.userService.getUser();
    this.outputUsers();
   }

  ngOnInit() {
  }
  public createTableUser(){
    let createTable = document.createElement("div");
    document.body.appendChild(createTable);
    createTable.id = "table";
    return createTable;
  }

  public createTableRow( wrapperBlock:HTMLDivElement, user:IUser){
    
    let createWrapElement = document.createElement("div");
    createWrapElement.id = user.Id;
    let createNewUserElement = document.createElement("div")
    let createButtonDelete = document.createElement("button");
    createButtonDelete.className = "btn btn-primary";
    createNewUserElement.innerHTML = user.Name + " " + user.Age + " " + user.Email;
    createButtonDelete.innerHTML = "Delete";
    createButtonDelete.setAttribute("click", "deleteUser('" + user.Id + "')");
    wrapperBlock.appendChild(createWrapElement);
    createWrapElement.appendChild(createNewUserElement);
    createWrapElement.appendChild(createButtonDelete);
    
  }

  public outputUsers() {
    let wrapperBlock = this.createTableUser();
    for (let user of this.users) {
      this.createTableRow(wrapperBlock, user);
    }
  }
  public compare() {
    let newUserArrey = [];
    let filterInput = <HTMLInputElement>document.getElementById("filter");
    let compareValue = filterInput.value;
    document.body.removeChild(document.getElementById("table"));
    let wrapperBlock = this.createTableUser();
    for (let i = 0; i < this.users.length; i++) {
      let userString = this.users[i].Name + " " + this.users[i].Age + " " + this.users[i].Email;
      let findValue = userString.indexOf(compareValue) != -1;
      if (findValue == true) {
        this.createTableRow(wrapperBlock, this.users[i]);
        newUserArrey.push(userString);
      }
    }
    return newUserArrey;
  }

  public bubbleSort() {
    for (let i = 0; i < this.users.length - 1; i++) {
      for (let j = 0; j < this.users.length - 1 - i; j++) {
        let ageNumber = this.users[j].Age;
        let ageNumberNextUser = this.users[j + 1].Age;
        if (ageNumber > ageNumberNextUser) {
          let upElement = this.users[j];
          this.users[j] = this.users[j + 1];
          this.users[j + 1] = upElement;
        }
      }
    }
    document.body.removeChild(document.getElementById("table"));
    let wrapperBlock = this.createTableUser();
    for (let i = 0; i < this.compare().length, i < this.users.length; i++) {
      this.createTableRow(wrapperBlock, this.users[i]);
    }
    return this.users;
    
  }

  public deleteUser(user: IUser) {
    let table = document.getElementById("table");
    let userId = user.toString();
    table.removeChild(document.getElementById(userId));
    this.userService.getUser()
    for (let user of this.users) {
      if(user.Id == userId){
        var indexUser = this.users.indexOf(user);
      }
    }
    this.users.splice(indexUser, 1);
    this.userService.addUser(this.users);
  }
}

