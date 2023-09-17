import { Point } from './Point';
import { Position } from '../types/Position';

interface Parameters {
    basePointSize?: number;
    pointMaxSize?: number;
    distanceBetweenPoints?: number;
    hoverRadius?: number;
    padding?: number;
    colorMain?: string;
    colorSecondary?: string;
    isHoverEffect?: boolean;
    isColorChange?: boolean;
    isSizeChange?: boolean;
    isGradientAnimation?: boolean;
}

export class Points {
    readonly width: number;
    readonly height: number;
    cursorPosition: Position;
    isCursorInside: boolean;
    points: Point[];
    readonly parameters: Parameters;

    constructor(width: number, height: number, parameters?: Parameters) {
        this.width = width;
        this.height = height;
        this.cursorPosition = {x: null, y: null};
        this.isCursorInside = false;
        this.points = [];
        this.parameters = {
            basePointSize: 16,
            pointMaxSize: 32,
            distanceBetweenPoints: 16,
            hoverRadius: 180,
            padding: 24,
            colorMain: '#ECECEC',
            colorSecondary: '#B7B7B7',
            isHoverEffect: true,
            isColorChange: true,
            isSizeChange: true,
            isGradientAnimation: true,
            ...parameters, // Override default values with provided values if any
        };
        this.setup();
    }

    private setup() {
        if (this.parameters.basePointSize === undefined) return null;
        if (this.parameters.distanceBetweenPoints === undefined) return null;

        const pointsInRow = this.getCapacity(
            this.parameters.basePointSize,
            this.parameters.distanceBetweenPoints,
            this.width
        );
        const pointsInColumn = this.getCapacity(
            this.parameters.basePointSize,
            this.parameters.distanceBetweenPoints,
            this.height
        );

        const pointsTotalWidth = this.getPointsLength(pointsInRow, this.parameters.basePointSize, this.parameters.distanceBetweenPoints);
        const pointsTotalHeight = this.getPointsLength(pointsInColumn, this.parameters.basePointSize, this.parameters.distanceBetweenPoints);

        const firstPointAxisX = ( this.width - pointsTotalWidth ) / 2 + (this.parameters.basePointSize / 2); // counting from left
        const firstPointAxisY = ( this.height - pointsTotalHeight ) / 2 + (this.parameters.basePointSize / 2); // counting from top

        for(let i = 0; i < pointsInRow; i++) {
            for(let j = 0; j < pointsInColumn; j++) {
                const {x, y} = this.getPointAxisCoordinates(i, j, firstPointAxisX, firstPointAxisY, this.parameters.basePointSize, this.parameters.distanceBetweenPoints);
                this.points.push(new Point(x, y, this));
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
        return (pointsAmount * pointSize) + (distanceBetweenPoints * pointSize) - distanceBetweenPoints;
    }

    private getCapacity(pointSize: number, distanceBetweenPoints: number, elementLength: number): number {

        let fits = true;
        let size = 0;
        let state = 1; // 1 - point | 0 - distanceBetween
        let amount = 0;
        while(fits) {
          if(state === 1) {
              state = 0;
              if( ( size + pointSize ) < this.width ) {
                  size += pointSize;
                  amount++;
              } else {
                  fits = false;
              }
          }
          if(state === 0) {
              state = 1;
              if( ( size + distanceBetweenPoints ) < this.width ) {
                  size += pointSize;
              } else {
                  fits = false;
              }
          }
        }

        return size;
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
    }

    public update() {
        this.points.forEach(point => {
            point.update();
        })
    }
}