import { Component, OnInit } from '@angular/core';
import { IUser } from "../../interface/user";
import { UserService } from "../../services/user-service.service";
@Component({
  selector: 'app-output-users',
  templateUrl: './output-users.component.html',
  styleUrls: ['./output-users.component.scss']
})
export class OutputUsersComponent implements OnInit {
  public userService: UserService;
  public users: IUser[];
  public resultFilter: IUser[];
  public user: IUser;
  public filterValue: string; 
  
  
  constructor() {
    this.userService = new UserService();
    this.users = this.userService.getUsers();
   }

  ngOnInit() {
    this.resultFilter = this.users;
  }
  public compare() {
    console.log(this.resultFilter);
    this.resultFilter = this.users.filter(
    
      user => {
               if(user.Name.toLowerCase().search(this.filterValue.toLowerCase())!= -1 || user.Email.toLowerCase().search(this.filterValue.toLowerCase()) != -1 || user.Age.toString().search(this.filterValue) != -1 ){
           return true;
        }
      });
      }

  public bubbleSort() {
    for (let i = 0; i < this.resultFilter.length - 1; i++) {
      for (let j = 0; j < this.resultFilter.length - 1 - i; j++) {
        let ageNumber = Number( this.resultFilter[j].Age);
        let ageNumberNextUser = Number(this.resultFilter[j + 1].Age);
        if (ageNumber > ageNumberNextUser) {
          let upElement = this.resultFilter[j];
          this.resultFilter[j] = this.resultFilter[j + 1];
          this.resultFilter[j + 1] = upElement;
        }
      }
    }
  }

  public deleteUser(user: IUser) {
    let userId = user.toString();
    this.userService.getUsers()
    for (let user of this.users) {
      if(user.Id == userId){
        var indexUser = this.users.indexOf(user);
      }
    }
    this.users.splice(indexUser, 1);
    this.resultFilter = this.users;
    this.compare();
    this.userService.saveUsers(this.users);
  }
}

