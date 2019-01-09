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
  constructor() {
    this.userService = new UserService();
  }

  ngOnInit() {}

  public onAddUser() {
    this.isRefresh = !this.isRefresh;
  }
  public openModal() {
    this.modalShow = !this.modalShow;
    return this.modalShow;
    console.log(this.modalShow);
  }
}
