import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";
@Component({
  selector: "create-user",
  templateUrl: "./create-users.component.html",
  styleUrls: ["./create-users.component.scss"]
})
export class CreateUsersComponent implements OnInit {
  public userService: UserService;
  public name: string = "";
  public age: number = 0;
  public email: string = "";
  public users: IUser[];
  public resultFilter: IUser[] = [];
  @Output() onAddUser = new EventEmitter();
  constructor() {
    this.userService = new UserService();
  }

  ngOnInit() {}

  private generateId(): string {
    let idValue = Math.random().toString(10).substr(2, 9);
    return idValue;
  }

  public isValidEmailAddress(emailValue: string): boolean {
    var pattern = new RegExp(
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    );
    var result = pattern.test(emailValue);
    return result;
  }

  public validateForm(): boolean {
    let validateEmail = this.isValidEmailAddress(this.email);
    if (this.name == "") {
      alert("Name is empty!");
      return false;
    }

    if (isNaN(this.age)) {
      alert("Age must be number!");
      return false;
    }

    if (this.age == null) {
      alert("Age is empty!");
      return false;
    }

    if (this.email == "") {
      alert("Email is empty!");
      return false;
    }

    if (validateEmail == false) {
      alert("Email invalid");
      return false;
    }
  }
  public clearForm() {
    this.name = "";
    this.age = 0;
    this.email = "";
  }

  public addUser(): boolean {
    let idElement = this.generateId();
    let validation = this.validateForm();
    if (validation == false) {
      return false;
    }
    this.users = this.userService.getUsers();
    let user: IUser = {
      Name: this.name,
      Age: this.age,
      Email: this.email,
      Id: idElement
    };

    this.users.push(user);
    this.userService.saveUsers(this.users);
    alert("User has been added sucsesfuly!");
    this.resultFilter = this.users;
    this.onAddUser.emit(null);
    this.clearForm();
  }
}
