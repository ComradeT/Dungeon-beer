import number from './number.js';
import {Hero} from './cell.js';
 
const grid = {
    gridElement: document.querySelector(".grid"),
    cells: [],
    playable: false,
    directionRoots: {
        // roots are the first row's or column's indexes of swipe direction
        'UP': [1, 2, 3],
        'RIGHT': [3, 6, 9],
        'DOWN': [7, 8, 9],
        'LEFT': [1, 4, 7]
    },
    init: function() {
        const cellElements = document.getElementsByClassName("cell");
        let cellIndex = 1;

        for(let cellElement of cellElements) {
            grid.cells[cellIndex] = {
                element: cellElement,
                top: cellElement.offsetTop,
                left: cellElement.offsetLeft,
                cell_number: cellIndex, //номер клетки 1-9
                number: null,
                disembodied: false,
            }

            cellIndex++;
        }// просчитали все пустые ячейки и их позицию

        // spawn first number and start game
        Hero.spawn_Hero();
        for (let i = 0; i < 8; i++) {
            number.spawnCard();
        }
        this.playable = true;
    },
    randomEmptyCellIndex: function() {
        let emptyCells = []; //массив чисел 1-9
        
        for (let i = 1; i < this.cells.length; i++) {
            if(this.cells[i].number === null) {
                emptyCells.push(i);
            }
        }

        if(emptyCells.length === 0) {
            return false;
        }

        return emptyCells[ Math.floor(Math.random() * emptyCells.length) ];
    },
    randomCellIndex: function() {
        let anyCells = [];
        
        for (let i = 1; i < this.cells.length; i++) {
            if(this.cells[i].number !== null && this.cells[i].number.className !== 'hero' && this.cells[i].number.className !== 'giant') {
                anyCells.push(i);
            }
        }

        if(anyCells.length === 0) {
            return false;
        }

        return anyCells[ Math.floor(Math.random() * anyCells.length) ];
    },
    checkGameOver: function(){
        if(Hero.number <= 0){
            return true
        }
    },
}

export default grid;