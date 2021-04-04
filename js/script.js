import grid from './../modules/grid.js';
import {Hero, moveToCell} from './../modules/cell.js';
 
grid.init();
document.addEventListener('keyup', function(e) {
    let direction = null;

    if(e.keyCode === 38) {
        direction = 'UP';
    } else if(e.keyCode === 39) {
        direction = 'RIGHT';
    } else if(e.keyCode === 40) {
        direction = 'DOWN';
    } else if(e.keyCode === 37) {
        direction = 'LEFT';
    }

    if(direction !== null) {
        moveToCell(grid.cells[Hero.cell_number], direction);
    }
    return false;
});
