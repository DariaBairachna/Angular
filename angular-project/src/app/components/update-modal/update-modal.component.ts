import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output} from "@angular/core";
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";
import { CreateUsersComponent  } from "../create-users/create-users.component";
// import { UsersComponent } from "../../pages/users/users.component";
@Component({
  selector: "update-modal",
  templateUrl: "./update-modal.component.html",
  styleUrls: ["./update-modal.component.scss"]
})
export class UpdateModalComponent implements OnInit {
  user: IUser;
  name: string; 
  age: number; 
  email: string; 
  id: string;
  userService: UserService;
  createUser: CreateUsersComponent;
  users: IUser[] = [];
  public userInfo:number;
  public resultFilter: IUser[] = [];
  @Output() closeModalEvent = new EventEmitter();

  constructor() {
    this.userService = new UserService();
    this.createUser = new CreateUsersComponent();
    this.users = this.userService.getUsers();
  }
  @Input() modalShow: boolean;
  @Input() userId: string;
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    this.userInfo = this.getUserInfo();
  }
  public getUserInfo():number {
    for (this.user of this.users) {
      if (this.user.Id == this.userId) {
        var indexUser = this.users.indexOf(this.user);
        this.name = this.users[indexUser].Name;
        this.age = this.users[indexUser].Age;
        this.email = this.users[indexUser].Email;
        return indexUser;
      }
    }
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


  public updateUser():boolean{

   let validation = this.validateForm();
    if (validation == false) {
      return false;
    }
    this.users = this.userService.getUsers();
    let user: IUser = {
      Name: this.name,
      Age: this.age,
      Email: this.email,
      Id: this.userId
    };
    this.users.splice(this.getUserInfo(), 1, user);
    this.userService.saveUsers(this.users);
    alert("User has been added sucsesfuly!");
    this.resultFilter = this.users;
    this.closeModal();
  }

  public closeModal():void {
    this.closeModalEvent.emit(this.modalShow);
  }
}
