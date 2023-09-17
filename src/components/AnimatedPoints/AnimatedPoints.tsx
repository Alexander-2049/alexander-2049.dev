'use client';

import { useEffect, useState } from 'react';
import { Points } from './classes/Points';
import { useElementSize } from '../../hooks/useElementResize';

interface Props {
    basePointSize?: number;
    pointMaxSize?: number;
    distanceBetweenPoints?: number;
    hoverRadius?: number;
    padding?: number;
    defaultColor?: string;
    hoverColor?: string;
    isHoverEffect?: boolean;
    isColorChange?: boolean;
    isSizeChange?: boolean;
    isGradientAnimation?: boolean;
}

const AnimatedPoints: React.FC<Props> = ({
    basePointSize = 16,
    pointMaxSize = 32,
    distanceBetweenPoints = 16,
    hoverRadius = 180,
    padding = 24,
    defaultColor = '#ECECEC',
    hoverColor = '#B7B7B7',
    isHoverEffect = true,
    isColorChange = true,
    isSizeChange = true,
    isGradientAnimation = true
}) => {

    const [upd, setUpd] = useState(0);
    const [squareRef, { width, height }] = useElementSize()
    const [points, setPoints] = useState<Points>(new Points(width, height, {
        basePointSize,
        distanceBetweenPoints
    }));

    useEffect(() => {
        setPoints(new Points(width, height));
    }, [width, height])

    useEffect(() => {
        console.log(points.get()[4]?.distance)
    }, [points, upd])
    
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
                height: '500px',
                backgroundColor: 'yellow'
            }}
        >
            {points.get().map(point => (
                <div key={`${point.x}.${point.y}`} style={{
                    display: 'block',
                    position: 'absolute',
                    left: `${point.x}px`,
                    top: `${point.y}px`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'red',
                    width: '4px',
                    height: '4px',
                    pointerEvents: 'none'
                }}></div>
            ))}
        </div>
    );
};

export default AnimatedPoints;