import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    declarations: [UserFormComponent, UserListComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [UserListComponent]
})
export class UserModule {}
