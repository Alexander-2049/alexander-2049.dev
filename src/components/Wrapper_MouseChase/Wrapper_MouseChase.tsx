import styles from './styles.module.css'
import { useState, useRef, useLayoutEffect, ReactNode } from 'react'
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

const Wrapper_MouseChase: React.FC<Props> = ({
    multiplier = 5,
    tension = 120,
    friction = 14,
    children,
    ...props
  }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [cursorCoordinates, setCursorCoordinates] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if(ref.current === null) return;
        const element = ref.current as HTMLElement; // Type assertion
        setWrapperSize({ width: element.offsetWidth, height: element.offsetHeight });
      }, []);

    const formulaX = (cursorCoordinates.x - wrapperSize.width / 2) / (wrapperSize.width / 2) * multiplier;
    const formulaY = (cursorCoordinates.y - wrapperSize.height / 2) / (wrapperSize.height / 2) * multiplier;

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
        ref={ref}
        style={{...elementStyle}}
        className={styles.wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        {...props}
        >{children}</animated.div>
    );
};

export default Wrapper_MouseChase;