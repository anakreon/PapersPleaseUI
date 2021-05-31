import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    declarations: [UserFormComponent, UserListComponent],
    imports: [CommonModule, ReactiveFormsModule, MatListModule, MatInputModule, MatButtonModule, MatIconModule],
    exports: [UserFormComponent, UserListComponent]
})
export class UserModule {}
