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
    }

    public update() {
        this.points.forEach(point => {
            point.update();
        })
    }
}