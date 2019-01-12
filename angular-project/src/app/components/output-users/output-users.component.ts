import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter} from "@angular/core";
import { IUser } from "../../models/user.model";
import { UserService } from "../../services/user-service.service";
@Component({
  selector: "output-users",
  templateUrl: "./output-users.component.html",
  styleUrls: ["./output-users.component.scss"]
})
export class OutputUsersComponent implements OnInit {
  public userService: UserService;
  public user: IUser;
  public users: IUser[];
  public resultFilter: IUser[] = [];
  public filterValue: string;
  public modalShow: boolean = false;
  public userId: string
  public emitInformation: object ;

  @Input() isRefresh: boolean;
  @Output() forUpdateUser = new EventEmitter();
  constructor() {
    this.userService = new UserService();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.users = this.userService.getUsers();
    this.resultFilter = this.users;
    this.compare();
    this.bubbleSort();
  }

  ngOnInit() {
    this.resultFilter = this.users;
  }

  public compare():void {
    if (this.filterValue !== undefined) {
      this.resultFilter = this.users.filter(user => {
        if (user.Name.toLowerCase().search(this.filterValue.toLowerCase()) != -1 ||
          user.Email.toLowerCase().search(this.filterValue.toLowerCase()) != -1 ||
          user.Age.toString().search(this.filterValue) != -1) {
          return true;
        }
      });
    }
  }

  public bubbleSort():void {
    for (let i = 0; i < this.resultFilter.length - 1; i++) {
      for (let j = 0; j < this.resultFilter.length - 1 - i; j++) {
        let ageNumber = Number(this.resultFilter[j].Age);
        let ageNumberNextUser = Number(this.resultFilter[j + 1].Age);
        if (ageNumber > ageNumberNextUser) {
          let upElement = this.resultFilter[j];
          this.resultFilter[j] = this.resultFilter[j + 1];
          this.resultFilter[j + 1] = upElement;
        }
      }
    }
  }

  public deleteUser(user: IUser):void {
    var userId = user.toString();
    for (let user of this.users) {
      if (user.Id == userId) {
        var indexUser = this.users.indexOf(user);
      }
    }
    this.users.splice(indexUser, 1);
    this.resultFilter = this.users;
    this.compare();
    this.userService.saveUsers(this.users);
   
  }


  public openModal(userId: string):void {
    this.emitInformation = {
      modalShow: this.modalShow,
      userId: userId
    }
    this.forUpdateUser.emit(this.emitInformation);
   } 
  




}
