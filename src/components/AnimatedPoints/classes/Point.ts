import { Points, PointsParameters } from "./Points";

export class Point {
    readonly x: number;
    readonly y: number;
    distance: number | null;
    readonly points: Points;
    scale: number;
    parameters: PointsParameters;

    constructor(x: number, y: number, points: Points) {
        this.x = x;
        this.y = y;
        this.distance = null;
        this.points = points;
        this.parameters = points.parameters;
        this.scale = 1;
    }

    public update() {
        const {
            basePointSize = 16,
            pointMaxScale = 4, // Change this to the desired max scale
            distanceBetweenPoints = 16,
            hoverRadius = 180,
            colorMain = '#ECECEC',
            colorSecondary = '#B7B7B7',
            isHoverEffect = true,
            isColorChange = true,
            isSizeChange = true,
            isGradientAnimation = true,
            padding = 16,
        } = this.points.parameters;
    
        if (this.points.cursorPosition.x === null || this.points.cursorPosition.y === null) {
            this.distance = null;
            this.scale = 1;
            return;
        }
        this.distance = Math.sqrt((this.x - this.points.cursorPosition.x) ** 2 + (this.y - this.points.cursorPosition.y) ** 2);
    
        // Calculate the scaling factor based on distance
        if (this.distance <= 0) {
            this.scale = pointMaxScale; // Set it to the max scale value
        } else if (this.distance > hoverRadius) {
            this.scale = 1;
        } else {
            // Calculate the scaling factor as a linear interpolation between pointMaxScale and 1 based on distance
            this.scale = pointMaxScale - ((pointMaxScale - 1) * this.distance / hoverRadius);
        }
    }
    
    
}