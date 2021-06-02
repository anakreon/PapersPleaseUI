import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BgmService {
    private bgm: HTMLAudioElement;
    private isBgmPlaying = false;
    constructor() {
        this.bgm = new Audio('assets/bgm.mp3');
        this.bgm.volume = 0.2;
        this.bgm.loop = true;
    }
    public play(): void {
        if (!this.bgm.muted) {
            this.bgm.play();
            this.isBgmPlaying = true;
        }
    }
    public pause(): void {
        this.bgm.pause();
        this.isBgmPlaying = false;
    }
    public mute(): void {
        this.bgm.muted = true;
    }
    public unmute(): void {
        this.bgm.muted = false;
    }
    public isPlaying(): boolean {
        return this.isBgmPlaying;
    }
}
