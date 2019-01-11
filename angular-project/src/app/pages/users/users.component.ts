import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public userService: UserService;
  public isRefresh: boolean = false;
  public modalShow: boolean = false;
  public userId: string;

  user:IUser;
  users:IUser[];

  constructor() {
    this.userService = new UserService();
  }

  ngOnInit() {

  }

  public onAddUser() {
    this.isRefresh = !this.isRefresh;
  }
  
  public forUpdateUser(emitInformation){
    this.modalShow = !this.modalShow;
    this.userId = emitInformation.userId;
  }
  public closeModalEvent(){
    this.modalShow = !this.modalShow;
    this.onAddUser();
  }

}
