import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { WorkPass } from 'papersplease/lib/papers/WorkPass';

@Component({
    selector: 'app-work-pass',
    templateUrl: './work-pass.component.html',
    styleUrls: ['./work-pass.component.scss']
})
export class WorkPassComponent implements OnInit {
    @Input() public papers: Papers = null;
    public workpass: WorkPass;

    ngOnInit(): void {
        this.workpass = this.papers.getWorkPass();
    }
}
