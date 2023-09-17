import { Points } from "./Points";

export class Point {
    readonly x: number;
    readonly y: number;
    distance: number | null;
    readonly points: Points;
    size: number;

    constructor(x: number, y: number, points: Points) {
        this.x = x;
        this.y = y;
        this.distance = null;
        this.points = points;
        this.size = 0;
    }

    public update() {
        const {
            basePointSize= 16,
            pointMaxSize= 32,
            distanceBetweenPoints= 16,
            hoverRadius= 180,
            padding= 24,
            colorMain= '#ECECEC',
            colorSecondary= '#B7B7B7',
            isHoverEffect= true,
            isColorChange= true,
            isSizeChange= true,
            isGradientAnimation= true,
        } = this.points.parameters;
        
        if(this.points.cursorPosition.x === null || this.points.cursorPosition.y === null) {
            this.distance = null;
            return;
        }
        this.distance = Math.sqrt((this.x - this.points.cursorPosition.x) ** 2 + (this.y - this.points.cursorPosition.y) ** 2);

        // Adjust the point size based on distance
        if (this.distance < hoverRadius) { 
            this.size = basePointSize + (hoverRadius - this.distance) / 4;
        } else {
            this.size = basePointSize;
        }
    }
}