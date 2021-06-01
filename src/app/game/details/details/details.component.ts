import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Papers } from 'papersplease';
import { Subscription } from 'rxjs';
import { BulletinService } from '../../bulletin.service';
import { EntrantService } from '../../entrant.service';
import { DRAG_CHANNEL } from '../../enums';
import { RoundService } from '../../round.service';
import { PassportStatus } from '../passport/passport.component';

interface Position {
    top: number;
    left: number;
}

const sizes = {
    passport: {
        width: 215,
        height: 300
    },
    idcard: {
        width: 300,
        height: 200
    },
    permit: {
        width: 150,
        height: 330
    },
    workpass: {
        width: 150,
        height: 250
    },
    grant: {
        width: 250,
        height: 250
    },
    certificate: {
        width: 200,
        height: 250
    },
    authorization: {
        width: 200,
        height: 300
    },
    bulletin: {
        width: 263,
        height: 329
    }
};

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('dropzone') dropzone: ElementRef;
    private boothArrivalSubscription: Subscription;
    private papersInterpretedSubscription: Subscription;
    private bulletinSubscription: Subscription;
    public coordinates = {};
    private boundingRect: DOMRect;
    private dragStartCoords: Position;
    public passportStatus: PassportStatus;
    public papers: Papers;
    public bulletin: string;

    constructor(private roundService: RoundService, private entrantService: EntrantService, private bulletinService: BulletinService) {}

    ngOnInit(): void {
        this.boothArrivalSubscription = this.roundService.getArrivedAtBooth().subscribe(() => {
            this.resetPassportStatus();
        });
        this.papersInterpretedSubscription = this.entrantService.getInterpretedPapers().subscribe((papers: Papers) => {
            this.papers = papers;
            console.log(papers);
        });
        this.bulletinSubscription = this.bulletinService.getBulletin().subscribe((bulletin: string) => {
            console.log('getting bulletin: ', bulletin);
            this.bulletin = bulletin;
        });
    }

    ngOnDestroy(): void {
        this.boothArrivalSubscription.unsubscribe();
        this.papersInterpretedSubscription.unsubscribe();
        this.bulletinSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.dropzone.nativeElement.addEventListener('drop', this.dropHandler.bind(this));
        this.dropzone.nativeElement.addEventListener('dragover', this.dragoverHandler.bind(this));
    }

    public isVisible(identifier: string): boolean {
        return this.coordinates[identifier];
    }

    private dropHandler(event): void {
        event.preventDefault();
        const { target, channel } = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (channel === DRAG_CHANNEL.MOVE_PAPER) {
            const newPosition: Position = {
                left: this.coordinates[target].left + event.clientX - this.dragStartCoords.left,
                top: this.coordinates[target].top + event.clientY - this.dragStartCoords.top
            };
            this.coordinates[target] = this.getElementPositionWithinBounds(event, target, newPosition);
            console.log(this.coordinates[target]);
            this.dragStartCoords = null;
        } else if (channel === DRAG_CHANNEL.INSPECT_PAPER) {
            console.log('droppping', target);
            const mousePosition = this.getRelativeMousePosition(event);
            this.coordinates[target] = this.getElementPositionWithinBounds(event, target, mousePosition);
        }
    }

    private dragoverHandler(event): void {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    private getElementPositionWithinBounds(event, element: string, position: Position): Position {
        const newPosition = {
            left: position.left,
            top: position.top
        };
        if (position.left + sizes[element].width >= this.boundingRect.width) {
            newPosition.left = this.boundingRect.width - sizes[element].width;
        }
        if (position.top + sizes[element].height >= this.boundingRect.height) {
            newPosition.top = this.boundingRect.height - sizes[element].height;
        }
        if (position.top < 0) {
            newPosition.top = 0;
        }
        if (position.left < 0) {
            newPosition.left = 0;
        }
        return newPosition;
    }

    private getRelativeMousePosition(event): Position {
        console.log(event);
        if (!this.boundingRect) {
            this.boundingRect = event.target.getBoundingClientRect();
        }
        return {
            left: event.clientX - this.boundingRect.left,
            top: event.clientY - this.boundingRect.top
        };
    }

    public getTop(paper: string): number {
        return this.coordinates[paper].top;
    }

    public getLeft(paper: string): number {
        return this.coordinates[paper].left;
    }

    public onDragStart(event, target): void {
        event.dataTransfer.setData(
            'text/plain',
            JSON.stringify({ channel: DRAG_CHANNEL.MOVE_PAPER, target, passportStatus: this.passportStatus })
        );
        event.dataTransfer.dropEffect = 'move';
        this.dragStartCoords = {
            left: event.clientX,
            top: event.clientY
        };
    }
    public onDragEnd(event): void {
        console.log('dragend', event, event.dataTransfer.dropEffect);
        const { target } = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (event.dataTransfer.dropEffect === 'link') {
            console.log('removing', target);
            this.coordinates[target] = null;
        }
    }

    public getPassportStatus(): PassportStatus {
        return this.passportStatus;
    }

    private resetPassportStatus(): void {
        this.passportStatus = null;
    }

    public deny(): void {
        if (this.isPassportAligned([340, 420], [60, 110])) {
            this.passportStatus = 'Denied';
            console.log('denying');
        }
    }
    public approve(): void {
        if (this.isPassportAligned([510, 570], [60, 110])) {
            this.passportStatus = 'Approved';
            console.log('approving');
        }
    }
    private isPassportAligned(xRange, yRange): boolean {
        return (
            this.coordinates['passport'] &&
            this.coordinates['passport'].left > xRange[0] &&
            this.coordinates['passport'].left < xRange[1] &&
            this.coordinates['passport'].top > yRange[0] &&
            this.coordinates['passport'].top < yRange[1]
        );
    }
}
