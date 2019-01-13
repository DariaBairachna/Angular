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
  private validateName = false;
  private validateAge = false;
  private validateAgeEmpty = false;
  private validateEmailEmpty = false;
  private validateEmailValue = false;
  // public validateValue: boolean = false;
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
 this.validateName = false;
    this.validateAge = false;
    this.validateAgeEmpty = false;
    this.validateEmailEmpty = false;
    this.validateEmailValue = false;
    if (this.name == "") {
      this.validateName = true;
    
    }

    if (isNaN(this.age)) {
      this.validateAge = true;
    }

    if (this.age.toString() == "") {
      this.validateAgeEmpty = true;
    }

    if (this.email == "") {
      this.validateEmailEmpty = true;
      return false;
    }

    if (validateEmail == false) {
      this.validateEmailValue = true;
    }
    if (this.validateName == true || this.validateAge == true || this.validateAgeEmpty == true || this.validateEmailValue == true ){
      return false;
    }
    
  }
  public clearForm():void {
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
