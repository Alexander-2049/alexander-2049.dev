'use client';

import { useElementSize } from '../../hooks/useElementResize';
import styles from './styles.module.css'
import { useState, ReactNode, HTMLProps } from 'react'
import { useSpring, animated } from "react-spring";

interface Props {
  /**
   * How sensitive this reaction should be
   */
    multiplier?: number,
  /**
   * Tension of the reaction
   */
    tension?: number,
  /**
   * Friction of the reaction
   */
    friction?: number,
  /**
   * What should be inside of this wrapper
   */
    children?: ReactNode,
}

const AnimatedMouseChaseWrapper: React.FC<Props & HTMLProps<HTMLDivElement>> = ({
    multiplier = 5,
    tension = 120,
    friction = 14,
    children,
    style,
    ...props
  }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [cursorCoordinates, setCursorCoordinates] = useState({ x: 0, y: 0 });

    const [squareRef, { width, height }] = useElementSize()

    const formulaX = (cursorCoordinates.x - width / 2) / (width / 2) * multiplier;
    const formulaY = (cursorCoordinates.y - height / 2) / (height / 2) * multiplier;

    const elementStyle = useSpring({
        x: isHovered ? formulaX : 0,
        y: isHovered ? formulaY : 0,
        config: { tension, friction },
    });

    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const element = event.target as HTMLElement; // Type assertion
        if (!element) return;

        const { left, top } = element.getBoundingClientRect();
        const { clientX, clientY } = event;
        const x = clientX - left;
        const y = clientY - top;

        setCursorCoordinates({ x, y });
    };


    return (
        <animated.div
        {...props}
        ref={squareRef}
        style={{...style, ...elementStyle}}
        className={[styles.wrapper, props.className].join(' ')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        >{children}</animated.div>
    );
};

export default AnimatedMouseChaseWrapper;