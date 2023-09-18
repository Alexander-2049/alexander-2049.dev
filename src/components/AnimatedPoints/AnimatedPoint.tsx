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

    return (
        <animated.div
            className={styles.point}
            style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                backgroundColor: `${point.parameters.colorMain}`,
                width: `${point.parameters.basePointSize}px`, // Animate the width
                height: `${point.parameters.basePointSize}px`, // Animate the height
                scale: size.to((value) => `${value}`)
            }}
        />
    );
};

export default AnimatedPoint;
