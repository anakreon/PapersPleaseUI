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

    public onSubmit(): void {
        this.userForm.markAsTouched();
        if (this.userForm.valid) {
            const username = this.userForm.value.name;
            console.log(username);
            const user = { name: username, score: 0 };
            this.createUser.emit(user);
            this.userForm.reset();
        }
    }
}
