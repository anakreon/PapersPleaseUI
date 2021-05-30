import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.types';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @Output() selectUser: EventEmitter<User> = new EventEmitter<User>();
    private users: User[];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.users = this.userService.getUsers();
    }

    public getUsers(): User[] {
        return this.users;
    }

    public onSelectionFromList(event): void {
        const user = event.option.value;
        this.selectUser.emit(user);
    }
}
