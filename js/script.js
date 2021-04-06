import grid from './../modules/grid.js';
import {Hero, moveToCell} from './../modules/cell.js';

grid.init();

let character = document.querySelector(".character");
let person = document.querySelector('.hero');
let health = document.querySelector('.health')
character.addEventListener('click', () => {
    if (Hero.gold >= 0){
        person.style.backgroundImage = 'url(img/werewolf.svg)';
        Hero.number = 12;
        person.dataset.value = Hero.number;
        health.innerText = 12;
    }
});

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
