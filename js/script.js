import grid from './../modules/grid.js';
import {Hero, moveToCell} from './../modules/cell.js';
import swipe from './mouseSwipe.js';

grid.init();

let character = document.querySelector(".character");
let goldStatic = document.querySelector('.gold');
character.addEventListener('click', () => {
    if (Hero.gold >= 10){
        let posHero = Hero.cell_number;
        grid.cells[posHero].number.style.backgroundImage = 'url(img/werewolf.svg)';
        Hero.number = 12;
        grid.cells[posHero].number.dataset.value = Hero.number;
        grid.cells[posHero].number.childNodes[0].childNodes[0].innerText = 12;
        Hero.gold -= 10;
        goldStatic.innerText = Hero.gold;
        character.style.display = 'none';
    }
});

let modal = document.querySelector('.modalGameOver');
let restart = document.querySelectorAll('.yes');
restart[0].addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    regame();
});
restart[1].addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    regame();
});

//Rules
let modalRules = document.querySelector('.modalRulesContainer');
let btnRules = document.querySelector('.btn_rules');
let rules = document.querySelector('.rules');
rules.addEventListener('click', () => {
    modalRules.style.visibility = 'visible';
})
btnRules.addEventListener('click', () => {
    modalRules.style.visibility = 'hidden';
})

document.addEventListener('keyup', function(e) {

    if(e.keyCode === 13) {
        modal.style.visibility = 'hidden';
        regame();
    } 
});

let regame = function() {
    for(let i = 1; i < grid.cells.length; i++){
        grid.gridElement.removeChild(grid.cells[i].number);
        grid.cells[i].number = null;
    }
    Hero.number = 10;
    Hero.cell_number = null;
    Hero.attack = 0;
    Hero.gold = 0;
    Hero.poisoned = false;
    Hero.movement = true;
    grid.init();
    character.style.display = 'block';
    goldStatic.innerText = 0;
}

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

let gridDiv = document.querySelector('.grid');
swipe(gridDiv, { maxTime: 1000, minTime: 100, maxDist: 150,  minDist: 60 });
gridDiv.addEventListener('swipe', function(e) {
    let direction = null;

    if(e.detail.dir == 'up') {
        direction = 'UP';
    } else if(e.detail.dir == 'right') {
        direction = 'RIGHT';
    } else if(e.detail.dir == 'down') {
        direction = 'DOWN';
    } else if(e.detail.dir == 'left') {
        direction = 'LEFT';
    }

    if(direction !== null) {
        moveToCell(grid.cells[Hero.cell_number], direction);
    }
    
    return false;
});

let book = document.querySelector('.book__container');
book.addEventListener('click', () => {
    book.classList.toggle('book-active');
})
