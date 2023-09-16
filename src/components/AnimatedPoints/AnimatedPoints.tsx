import { useRef } from 'react';

interface Props {
    pointSize?: number;
    pointMaxSize?: number;
    distanceBetweenPoints?: number | 'auto';
    hoverRadius?: number;
    padding?: number;
    defaultColor?: string;
    hoverColor?: string;
    isHoverEffect?: boolean;
    isColorChange?: boolean;
    isSizeChange?: boolean;
    isGradientAnimation?: boolean;
}

const AnimatedDots: React.FC<Props> = ({
    pointSize = 16,
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
    const ref = useRef(null);

    /* breakdown
    * pointSize = 16
    * distanceBetweenPoints = 16
    * block { width: 360, height: 300 }
    * 
    * Math.floor( width / ( pointSize + distanceBetweenPoints ) )
    * we can calculate that we can fit 11 points in a row
    * and the same thing we can do with column calculation by using height instead of width
    * 
    * better calculation would be by doing a "while loop"
    * because we are counting spare margin at the end
    * 
    * example width / ( pointSize + distanceBetweenPoints )
    * example [point, margin, point, margin, point, margin]
    * 
    * so we do something like this
    * 
    * let fits = true;
    * let size = 0;
    * let state = 1; // 1 - point | 0 - distanceBetween
    * let amount = 0;
    * while(fits) {
    *   if(state === 1) {
    *       state = 0;
    *       if( ( size + pointSize ) < width ) {
    *           size += pointSize;
    *           amount++;
    *       } else {
    *           fits = false;
    *       }
    *   }
    *   if(state === 0) {
    *       state = 1;
    *       if( ( size + distanceBetween ) < width ) {
    *           size += pointSize;
    *       } else {
    *           fits = false;
    *       }
    *   }
    * }
    * 
    * so then we should put it in a function
    * size will be or width or height of the HTML element        \/
    * func getCapacity({pointSize, distanceBetweenPoints, size})
    * 
    * now we are gonna save it in constants
    * 
    * const dotsInRow = getCapacity({pointSize, distanceBetweenPoints, width})
    * const dotsInColumn = getCapacity({pointSize, distanceBetweenPoints, height})
    * 
    * now we would like to receive coordinates of each point inside of the HTML element
    * I would like to center this mass of points
    * 
    * to do this we need to know total width and height of these points
    * 
    * dotsInRow * pointSize + dotsInRow * distanceBetweenPoints - distanceBetweenPoints
    *                                                removing extra margin /\
    * 
    * so we are gonna also put it inside of the function
    * 
    * func getDotsLength({dotsAmount, pointSize, distanceBetweenPoints})
    * 
    * and now we are able to calculate everything
    * 
    * const dotsWidth = getDotsLength({dotsAmount: dotsInRow, pointSize, distanceBetweenPoints})
    * const dotsHeight = getDotsLength({dotsAmount: dotsInColumn, pointSize, distanceBetweenPoints})
    * 
    * const x = ( block.width - dotsWidth ) / 2;
    * const y = ( block.height - dotsHeight ) / 2;
    * 
    * so "x" is an "x" of the first point
    * and "y" is a "y" fo the first point
    * 
    * and now we are able to get any point position
    * 
    * 
    * 
    * interface Point {
    *   x: number; // axis
    *   y: number; // axis
    *   distance: number | null;
    *   scale: number;
    *   color: string;
    * }
    * 
    * function setup() {
    *   const pointsInRow = getPointsCapacity({pointSize, distanceBetweenPoints, width: block.width})
    *   const pointsInColumn = getPointsCapacity({pointSize, distanceBetweenPoints, height: block.height})
    *   
    *   const pointsWidth = getPointsLength({pointsAmount: pointsInRow, pointSize, distanceBetweenPoints})
    *   const pointsHeight = getPointsLength({pointsAmount: pointsInColumn, pointSize, distanceBetweenPoints})
    * 
    *   const firstPointX = ( block.width - dotsWidth ) / 2; // counting from left
    *   const firstPointY = ( block.height - dotsHeight ) / 2; // counting from top
    * 
    *   const points: Point[] = getAllPointsWithCoordinates({firstPointX, firstPointY, pointsInRow, pointsInColumn, distanceBetweenPoints});
    *   // MAYBE points should be stored in a class to do methods for these points
    *   // so that would be done to do something like
    *   // points.colorize()
    *   // so that would be applied to all points
    *   // points.setCursorPosition(x, y)
    * }
    * 
    * 
    * 
    * 
    * 
    */

    return (
        <div
            ref={ref}
        >
            
        </div>
    );
};

export default AnimatedDots;