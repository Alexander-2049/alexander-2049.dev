import { Points, PointsParameters } from "./Points";
import { defaultPointsParameters } from './defaultParameters';

export class Point {
    readonly x: number;
    readonly y: number;
    distance: number | null;
    readonly points: Points;
    scale: number;
    parameters: PointsParameters;
    color: string;

    constructor(x: number, y: number, points: Points) {
        this.x = x;
        this.y = y;
        this.distance = null;
        this.points = points;
        this.parameters = { ...defaultPointsParameters, ...points.parameters };
        this.scale = 1;
        this.color = this.parameters.colorMain || '#000000';
    }

    private interpolateColor(color1: string, color2: string, factor: number): string {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        const r = Math.round(r1 * (1 - factor) + r2 * factor);
        const g = Math.round(g1 * (1 - factor) + g2 * factor);
        const b = Math.round(b1 * (1 - factor) + b2 * factor);
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    public update() {
        const {
            basePointSize = 16,
            pointMaxScale = 4,
            distanceBetweenPoints = 16,
            hoverRadius = 180,
            colorMain = '#ECECEC',
            colorSecondary = '#B7B7B7',
            isHoverEffect = true,
            isColorChange = true,
            isScaleChange = true,
            isGradientAnimation = true,
            padding = 16,
        } = this.points.parameters;

        if (this.points.cursorPosition.x === null || this.points.cursorPosition.y === null) {
            this.distance = null;
            this.scale = 1;
            this.color = colorMain;
            return;
        }
        this.distance = Math.sqrt((this.x - this.points.cursorPosition.x) ** 2 + (this.y - this.points.cursorPosition.y) ** 2);

        if(isHoverEffect && isScaleChange) {
            // Calculate the scaling factor based on distance
            if (this.distance <= 0) {
                this.scale = pointMaxScale;
            } else if (this.distance > hoverRadius) {
                this.scale = 1;
            } else {
                // Calculate the scaling factor as a linear interpolation between pointMaxScale and 1 based on distance
                this.scale = pointMaxScale - ((pointMaxScale - 1) * this.distance / hoverRadius);
            }
        }

        if(isHoverEffect && isColorChange) {
            // Calculate the color based on distance
            if (this.distance <= 0) {
                this.color = colorSecondary; // Set it to the secondary color
            } else if (this.distance >= hoverRadius) {
                this.color = colorMain; // Set it to the main color
            } else {
                // Calculate the color using the interpolateColor method
                const interpolationFactor = this.distance / hoverRadius; // Normalize the distance to the range [0, 1]
                this.color = this.interpolateColor(colorSecondary, colorMain, interpolationFactor);
            }
        }
    }
}
