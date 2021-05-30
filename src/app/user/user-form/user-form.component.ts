import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../user.types';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    @Output() createUser: EventEmitter<User> = new EventEmitter<User>();

    public userForm = this.formBuilder.group({
        name: ''
    });

    constructor(private formBuilder: FormBuilder) {}

    public setUsername(event): void {
        const user = { name: event.target.value, score: 0 };
        this.createUser.emit(user);
    }
    public onSubmit(): void {
        this.userForm.reset();
    }
}
