import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';

interface Position {
    top: number;
    left: number;
}

const sizes = {
    passport: {
        width: 200,
        height: 300
    },
    idcard: {
        width: 300,
        height: 200
    },
    permit: {
        width: 150,
        height: 300
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
    }
};

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit {
    @ViewChild('dropzone') dropzone: ElementRef;
    public coordinates = {};
    private boundingRect: DOMRect;
    private dragStartCoords: Position;

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.dropzone.nativeElement.addEventListener('drop', this.dropHandler.bind(this));
        this.dropzone.nativeElement.addEventListener('dragover', this.dragoverHandler.bind(this));
    }

    public isVisible(identifier: string): boolean {
        return this.coordinates[identifier];
    }

    private dropHandler(event): void {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        if (this.dragStartCoords) {
            const newPosition: Position = {
                left: this.coordinates[data].left + event.clientX - this.dragStartCoords.left,
                top: this.coordinates[data].top + event.clientY - this.dragStartCoords.top
            };
            this.coordinates[data] = this.getElementPositionWithinBounds(event, data, newPosition);
            this.dragStartCoords = null;
        } else {
            console.log('droppping', data);
            const mousePosition = this.getRelativeMousePosition(event);
            this.coordinates[data] = this.getElementPositionWithinBounds(event, data, mousePosition);
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
        event.dataTransfer.setData('text/plain', target);
        event.dataTransfer.dropEffect = 'move';
        this.dragStartCoords = {
            left: event.clientX,
            top: event.clientY
        };
    }
}
