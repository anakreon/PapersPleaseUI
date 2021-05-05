import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    @Output() createUsername: EventEmitter<string> = new EventEmitter<string>();

    public userForm = this.formBuilder.group({
        name: ''
    });

    constructor(private formBuilder: FormBuilder) {}

    public setUsername(event): void {
        const username = event.target.value;
        this.createUsername.emit(username);
    }
    public onSubmit(): void {
        this.userForm.reset();
    }
}
