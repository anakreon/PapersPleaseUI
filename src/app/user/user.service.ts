import { Injectable } from '@angular/core';

interface User {
    name: string;
    score: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        {
            name: 'user1',
            score: 100
        },
        {
            name: 'user2',
            score: 154
        }
    ];
    constructor() {}

    public getUsers(): User[] {
        return this.users;
    }
}
