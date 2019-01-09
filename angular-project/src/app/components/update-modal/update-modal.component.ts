import { Component, OnInit, Input } from '@angular/core';
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";
@Component({
  selector: 'update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  user:IUser;
  name: string; 
  age:number; 
  email:string;
  id: string;
  userService: UserService;
  users: IUser[] = [];
  constructor( ) { 
    this.userService = new UserService();
    this.users = this.userService.getUsers();
    this.getUserInfo(); 
    }
  @Input() modalShow: boolean;

  ngOnInit() {
     }

  public getUserInfo(){
    this.users = this.userService.getUsers();
    this.user = {
      Name: this.name,
      Age: this.age,
      Email: this.email,
      Id: this.id
    };
    this.name = this.user.Name;
    this.age = this.user.Age;
    this.email = this.user.Email;
  }



}
