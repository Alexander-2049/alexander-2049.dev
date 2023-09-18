'use client';

import { useEffect, useState } from 'react';
import { Points } from './classes/Points';
import { useElementSize } from '../../hooks/useElementResize';
import AnimatedPoint from './AnimatedPoint';

interface Props {
    basePointSize?: number;
    pointMaxScale?: number;
    distanceBetweenPoints?: number;
    hoverRadius?: number;
    padding?: number;
    colorMain?: string;
    colorSecondary?: string;
    isHoverEffect?: boolean;
    isColorChange?: boolean;
    isScaleChange?: boolean;
    isGradientAnimation?: boolean;
    pointBorderRadius?: number;
}

const AnimatedPoints: React.FC<Props> = ({
    basePointSize = 16,
    pointMaxScale = 2.7,
    distanceBetweenPoints = 16,
    hoverRadius = 180,
    padding = 24,
    colorMain = '#ECECEC',
    colorSecondary = '#B7B7B7',
    isHoverEffect = true,
    isColorChange = true,
    isScaleChange = true,
    isGradientAnimation = true,
    pointBorderRadius = 50,
}) => {

    const [upd, setUpd] = useState(0);
    const [squareRef, { width, height }] = useElementSize()
    const [points, setPoints] = useState<Points>(new Points(width, height));


      // The component will re-render whenever any of the props change
      useEffect(() => {
        setPoints(
          new Points(width, height, {
            basePointSize,
            distanceBetweenPoints,
            colorMain,
            colorSecondary,
            hoverRadius,
            pointMaxScale,
            padding,
            isScaleChange,
            isHoverEffect,
            isGradientAnimation,
            isColorChange,
            pointBorderRadius
          })
        );
      }, [
        basePointSize,
        pointMaxScale,
        distanceBetweenPoints,
        hoverRadius,
        padding,
        colorMain,
        colorSecondary,
        isHoverEffect,
        isColorChange,
        isScaleChange,
        isGradientAnimation,
        width,
        height,
        pointBorderRadius
      ]);
    
    const handleMouseLeave = () => {
        points.setCursorPosition({ x: null, y: null });
        update();
    };

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const element = event.target as HTMLElement; // Type assertion
        if (!element) return;

        const { left, top } = element.getBoundingClientRect();
        const { clientX, clientY } = event;
        const x = clientX - left;
        const y = clientY - top;

        points.setCursorPosition({ x, y });
        update();
    };

    function update() {
        points.update();
        setUpd(new Date().getTime());
    }

    return (
        <div
            ref={squareRef}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                width: '700px',
                height: '700px',
                resize: 'horizontal'
            }}
        >
            {points.get().map((point, index) => (
                <AnimatedPoint key={`point.${index}`} point={point}/>
            ))}
        </div>
    );
};

export default AnimatedPoints;