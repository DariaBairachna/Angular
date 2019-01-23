import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output} from "@angular/core";
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";
import { IValidation } from "../../models/validation.model";
import { CreateUsersComponent  } from "../create-users/create-users.component";
// import { UsersComponent } from "../../pages/users/users.component";
@Component({
  selector: "update-modal",
  templateUrl: "./update-modal.component.html",
  styleUrls: ["./update-modal.component.scss"]
})
export class UpdateModalComponent implements OnInit {
  public user: IUser;
  
  public userService: UserService;
  public createUser: CreateUsersComponent;
  public users: IUser[] = [];
  name: IValidation = {
    value: "",
    validation: function(): boolean {
      if(this.value.length < 3){
        return true;
      }
    },
    isEmpty: this.isEmpty
   
  
  };
  age: IValidation = {
    value: "",
    validation: function(): boolean {
      if(isNaN(parseFloat(this.value))){
 
        return this.notNumber =  true;
      } 
      if(parseFloat(this.value)>150){
      
        this.notNumber = false;
        return this.maxAge = true
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
      if(!validateEmail){
     
            return true;
      }
    },
    isEmpty: this.isEmpty
   
  };
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

  private isEmpty(value:string): boolean{
    if(value == ""){
          
      return true;
     }
  }
  public getUserInfo():number {
    for (this.user of this.users) {
      if (this.user.Id == this.userId) {
        var indexUser = this.users.indexOf(this.user);
        this.name.value = this.users[indexUser].Name;
        this.age.value = (this.users[indexUser].Age).toString();
        this.email.value = this.users[indexUser].Email;
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
   
    if ( this.name.validation() || this.name.isEmpty(this.name.value) || this.age.validation() || this.age.isEmpty(this.age.value) || this.email.validation() || this.email.isEmpty(this.email.value) ) {
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
      Name: this.name.value,
      Age: Number(this.age.value),
      Email: this.email.value,
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
