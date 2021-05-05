import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public getItem<T>(key: string): T {
        const valueString = localStorage.getItem(key);
        return valueString ? JSON.parse(valueString) : null;
    }
    public setItem<T>(key: string, value: T): void {
        const valueString = JSON.stringify(value);
        localStorage.setItem(key, valueString);
    }
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    public clear(): void {
        localStorage.clear();
    }
}
