import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  SimpleChanges
} from "@angular/core";
import { IUser } from "../../models/user.model";
import { IValidation } from "../../models/validation.model";
import { UserService } from "../../services/user-service.service";
@Component({
  selector: "create-user",
  templateUrl: "./create-users.component.html",
  styleUrls: ["./create-users.component.scss"]
})
export class CreateUsersComponent implements OnInit {
  public userService: UserService;
  public users: IUser[];
  public notNumber: boolean;
  public maxAge: boolean;
  name: IValidation = {
    value: "",
    validation: function(): boolean {
      if (this.value.length < 3) {
        return true;
      }
    },
    isEmpty: this.isEmpty
  };
  age: IValidation = {
    value: "",
    validation: function(): boolean {
      if (isNaN(parseFloat(this.value))) {
        return (this.notNumber = true);
      }
      if (parseFloat(this.value) > 150) {
        this.notNumber = false;
        return (this.maxAge = true);
      }
    },
    isEmpty: this.isEmpty
  };
  email: IValidation = {
    value: "",
    validation: function(): boolean {
      var pattern = new RegExp(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      );
      var validateEmail = pattern.test(this.value);
      if (!validateEmail) {
        return true;
      }
    },
    isEmpty: this.isEmpty
  };

  // public validateValue: boolean = true;
  public resultFilter: IUser[] = [];
  @Output() onAddUser = new EventEmitter();
  constructor() {
    this.userService = new UserService();
  }

  ngOnInit() {}

  private generateId(): string {
    let idValue = Math.random()
      .toString(10)
      .substr(2, 9);
    return idValue;
  }

  private isEmpty(value: string): boolean {
    if (value == "") {
      return true;
    }
  }

  public validateForm(): boolean {
    if (
      this.name.validation() ||
      this.name.isEmpty(this.name.value) ||
      this.age.validation() ||
      this.age.isEmpty(this.age.value) ||
      this.email.validation() ||
      this.email.isEmpty(this.email.value)
    ) {
      return false;
    }
  }

  public clearForm(): void {
    // this.name = "";
    // this.age = 0;
    // this.email = "";
  }

  public addUser(): boolean {
    let idElement = this.generateId();

    let validation = this.validateForm();

    if (validation == false) {
      return false;
    }
    this.users = this.userService.getUsers();
    let user: IUser = {
      Name: this.name.value,
      Age: Number(this.age.value),
      Email: this.email.value,
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
