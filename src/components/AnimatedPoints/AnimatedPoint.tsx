import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Point } from './classes/Point';
import styles from './styles/AnimatedPoint.module.css';

interface Props {
    point: Point;
}

const AnimatedPoint = ({ point }: Props) => {
    const { size } = useSpring({
        from: { size: 0 }, // Set your initial size here
        to: { size: point.scale },
        config: { duration: 500, easing: t => 1 - (1 - t) * (1 - t) }, // Use ease-out easing
    });
    const color = useSpring({
        to: { backgroundColor: point.color },
        config: { duration: 500, easing: t => 1 - (1 - t) * (1 - t) }, // Use ease-out easing
    })

    const basePointSize = point.parameters.basePointSize;
    return (
        <animated.div
            className={styles.point}
            style={{
                left: `${point.x-basePointSize / 2}px`,
                top: `${point.y-basePointSize / 2}px`,
                width: `${point.parameters.basePointSize}px`, // Animate the width
                height: `${point.parameters.basePointSize}px`, // Animate the height
                scale: size.to((value) => `${value}`),
                zIndex: size.to((value) => `${Math.floor(value*25)}`),
                borderRadius: `${point.parameters.pointBorderRadius}%`,
                ...color
            }}
        />
    );
};

export default AnimatedPoint;
