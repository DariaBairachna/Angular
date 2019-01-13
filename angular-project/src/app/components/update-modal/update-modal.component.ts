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
  public user: IUser;
  public name: string; 
  public age: number; 
  public email: string; 
  public id: string;
  public userService: UserService;
  public createUser: CreateUsersComponent;
  public users: IUser[] = [];
  private validateName = false;
  private validateAge = false;
  private validateAgeEmpty = false;
  private validateEmailEmpty = false;
  private validateEmailValue = false;
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
