import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output} from "@angular/core";
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";
// import { UsersComponent } from "../../pages/users/users.component";
@Component({
  selector: "update-modal",
  templateUrl: "./update-modal.component.html",
  styleUrls: ["./update-modal.component.scss"]
})
export class UpdateModalComponent implements OnInit {
  user: IUser;
  name: string //= this.user.Name;
  age: number //= this.user.Age;
  email: string //= this.user.Email;
  id: string;
  userService: UserService;
  users: IUser[] = [];
  @Output() onUpdateUser = new EventEmitter();
  
  constructor() {
    this.userService = new UserService();
    this.users = this.userService.getUsers();
  
  
  }
  @Input() modalShow: boolean;
  @Input() userId: string;
  ngOnInit() {
  
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getUserInfo();
   
  }
  public getUserInfo() {
   
    // for (let user of this.users) {
    //   if (user.Id == userId) {
    //     var indexUser = this.users.indexOf(user);
    //   }
    // }
      // this.user = {
      //   Name: this.name,
      //   Age: this.age,
      //   Email: this.email,
      //   Id: this.id
      // };
      // this.name = this.users[indexUser].Name;
      // this.age = this.users[indexUser].Age;
      // this.email = this.users[indexUser].Email;
    
  }

  public openModal() {
    this.onUpdateUser.emit(this.modalShow);
  
  }
}
