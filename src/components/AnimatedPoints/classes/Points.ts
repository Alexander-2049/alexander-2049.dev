import { Point } from './Point';
import { Position } from '../types/Position';

export interface PointsParameters {
    basePointSize: number;
    pointMaxScale: number;
    distanceBetweenPoints: number;
    hoverRadius: number;
    colorMain: string;
    colorSecondary: string;
    padding: number;
    isHoverEffect: boolean;
    isColorChange: boolean;
    isScaleChange: boolean;
    isGradientAnimation: boolean;
    pointBorderRadius: number;
}

export class Points {
    readonly width: number;
    readonly height: number;
    cursorPosition: Position;
    isCursorInside: boolean;
    points: Point[];
    readonly parameters: PointsParameters;

    constructor(
        width: number,
        height: number,
        parameters: PointsParameters = {
            basePointSize: 48,
            pointMaxScale: 4,
            distanceBetweenPoints: 16,
            hoverRadius: 180,
            colorMain: '#ECECEC',
            colorSecondary: '#B7B7B7',
            padding: 16,
            isHoverEffect: true,
            isColorChange: true,
            isScaleChange: true,
            isGradientAnimation: true,
            pointBorderRadius: 50,
        }
    ) {
        this.width = width;
        this.height = height;
        this.cursorPosition = { x: null, y: null };
        this.isCursorInside = false;
        this.points = [];
        this.parameters = parameters;
        this.setup();
    }

    public get() {
        return this.points;
    }

    private setup() {
        const pointsInRow = this.getCapacity(
            this.parameters.basePointSize,
            this.parameters.distanceBetweenPoints,
            this.width,
            this.parameters.padding
        );
        const pointsInColumn = this.getCapacity(
            this.parameters.basePointSize,
            this.parameters.distanceBetweenPoints,
            this.height,
            this.parameters.padding
        );

        const pointsTotalWidth = this.getPointsLength(pointsInRow, this.parameters.basePointSize, this.parameters.distanceBetweenPoints);
        const pointsTotalHeight = this.getPointsLength(pointsInColumn, this.parameters.basePointSize, this.parameters.distanceBetweenPoints);
        
        const firstPointAxisX = (this.width - pointsTotalWidth) / 2 + (this.parameters.basePointSize / 2);
        const firstPointAxisY = (this.height - pointsTotalHeight) / 2 + (this.parameters.basePointSize / 2);

        for(let i = 0; i < pointsInRow; i++) {
            for(let j = 0; j < pointsInColumn; j++) {
                const {x, y} = this.getPointAxisCoordinates(i, j, firstPointAxisX, firstPointAxisY, this.parameters.basePointSize, this.parameters.distanceBetweenPoints);
                this.points.push(new Point(x, y, this));
                if(this.points.length >= 400) return;
            }
        }
    }

    private getPointAxisCoordinates(x: number, y: number, firstPointAxisX: number, firstPointAxisY: number, basePointSize: number, distanceBetweenPoints: number) {
        return {
            x: firstPointAxisX + ((basePointSize + distanceBetweenPoints) * x),
            y: firstPointAxisY + ((basePointSize + distanceBetweenPoints) * y),
        };
    }

    private getPointsLength(pointsAmount: number, pointSize: number, distanceBetweenPoints: number) {
        return (pointSize * pointsAmount) + (distanceBetweenPoints * pointsAmount) - distanceBetweenPoints;
    }

    private getCapacity(pointSize: number, distanceBetweenPoints: number, canvasSize: number, padding: number): number {
        const totalSize = pointSize + distanceBetweenPoints;
        return Math.floor((canvasSize - padding * 2) / totalSize);
    }

    public setCursorPosition({x, y}: Position): void {
        if(x === null || x < 0 || x > this.width ) {
            this.cursorPosition = {x: null, y: null};
            return;
        }
        if(y === null || y < 0 || y > this.height ) {
            this.cursorPosition = {x: null, y: null};
            return;
        }

        this.cursorPosition = {x, y};
        this.update();
    }

    public update() {
        this.points.forEach(point => {
            point.update();
        })
    }
}