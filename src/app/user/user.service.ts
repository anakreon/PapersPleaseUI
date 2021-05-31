import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { User } from './user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private storageKey = 'userData';

    constructor(private storageService: StorageService) {
        this.initializeStorage();
    }

    private initializeStorage(): void {
        const storageData = this.storageService.getItem<User[]>(this.storageKey);
        if (storageData === null) {
            const initialData: User[] = [];
            /*const initialData: User[] = [
                {
                    name: 'user1',
                    score: 100
                },
                {
                    name: 'user2',
                    score: 154
                }
            ];*/
            this.storageService.setItem<User[]>(this.storageKey, initialData);
        }
    }

    public getUsers(): User[] {
        return this.storageService.getItem<User[]>(this.storageKey);
    }

    public deleteUser(userToDelete: User): void {
        const users = this.storageService.getItem<User[]>(this.storageKey) || [];
        const updatedUsers = users.filter((user: User) => user.name !== userToDelete.name);
        this.storageService.setItem<User[]>(this.storageKey, updatedUsers);
    }

    public upsertUser(userToUpsert: User): void {
        const users = this.storageService.getItem<User[]>(this.storageKey) || [];
        const index = users.findIndex((user: User) => user.name === userToUpsert.name);
        if (index === -1) {
            users.push(userToUpsert);
        } else {
            users[index] = userToUpsert;
        }
        this.storageService.setItem<User[]>(this.storageKey, users);
    }
}
