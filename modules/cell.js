import grid from './grid.js';
import number from './number.js';

let Hero = {
    number: 10,
    cell_number: null,

    spawn_Hero: function() {
        const emptyCellIndex = 5;
        this.cell_number = emptyCellIndex;
        const heroElement = document.createElement("div");

        
        heroElement.dataset.value = this.number;
        heroElement.classList.add("hero");
        
        heroElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        heroElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

        grid.cells[emptyCellIndex].number = heroElement;

        const cardWapper = document.createElement('div');
        cardWapper.classList.add("card__wrapper");
        heroElement.append(cardWapper);

        const healthValue =  document.createElement('div');
        healthValue.classList.add("card__health");
        cardWapper.append(healthValue);
        healthValue.innerText = this.number;

        grid.gridElement.append(heroElement);
        return true;
    }
};

function moveToCell(from_Cell, direction){
    if(!grid.playable) {
        return false;
    }
    // set playable to false to prevent continous slides
    grid.playable = false;

    let to_Cell;
    let next_cell_number;
    let behind_cell;
    let prev_cell_number;
    let two_behind_cell;
    let two_prev_cell_number;
    if(direction == "UP"){
        next_cell_number = from_Cell.cell_number - 3;
        if(next_cell_number <= 0){
            grid.playable = true;
            return false;
        };
        to_Cell = grid.cells[next_cell_number];

        if (from_Cell.cell_number === 7) {
            prev_cell_number = 8;
            two_prev_cell_number = 9;
        }else if (from_Cell.cell_number === 8){
            prev_cell_number = 9;
        } else if(from_Cell.cell_number === 9) {
            prev_cell_number = 8;
            two_prev_cell_number = 7;
        } else {
            prev_cell_number = from_Cell.cell_number + 3;
        }
    }
    else if(direction == "DOWN"){
        next_cell_number = from_Cell.cell_number + 3;
        if(next_cell_number > 9){
            grid.playable = true;
            return false;
        };
        to_Cell = grid.cells[next_cell_number];

        if (from_Cell.cell_number === 3) {
            prev_cell_number = 2;
            two_prev_cell_number = 1;
        } else if(from_Cell.cell_number === 2){
            prev_cell_number = 1;
        } else if(from_Cell.cell_number === 1) {
            prev_cell_number = 2;
            two_prev_cell_number = 3;
        } else {
            prev_cell_number = from_Cell.cell_number - 3;
        }
    }
    else if(direction == "RIGHT"){
        let limit = [3, 6, 9];
        if(limit.includes(from_Cell.cell_number, 0)){
            grid.playable = true;
            return false;
        };
        next_cell_number = from_Cell.cell_number + 1;
        to_Cell = grid.cells[next_cell_number];

        if (from_Cell.cell_number === 1) {
            prev_cell_number = 4;
            two_prev_cell_number = 7;
        } else if(from_Cell.cell_number === 4){
            prev_cell_number = 7;
        } else if(from_Cell.cell_number === 7) {
            prev_cell_number = 4;
            two_prev_cell_number = 1;
        } else {
            prev_cell_number = from_Cell.cell_number - 1;
        }
    }
    else if(direction == "LEFT"){
        let limit = [1, 4, 7];
        if(limit.includes(from_Cell.cell_number, 0)){
            grid.playable = true;
            return false;
        };
        next_cell_number = from_Cell.cell_number - 1;
        to_Cell = grid.cells[next_cell_number];

        if (from_Cell.cell_number === 9) {
            prev_cell_number = 6;
            two_prev_cell_number = 3;
        } else if(from_Cell.cell_number === 6) {
            prev_cell_number = 3;
        } else if(from_Cell.cell_number === 3) {
            prev_cell_number = 6;
            two_prev_cell_number = 9;
        } else {
            prev_cell_number = from_Cell.cell_number + 1;
        }
    };
    behind_cell = grid.cells[prev_cell_number];
    two_behind_cell = grid.cells[two_prev_cell_number];
    relocate(from_Cell, to_Cell, behind_cell, two_behind_cell);
    setTimeout(function() {
        number.spawnCard();
        if(grid.checkGameOver()) {
            alert("GAME OVER!");
        } else {
            grid.playable = true;
        };
    }, 300)
};

function relocate(from_Cell, to_Cell, behind_cell, two_behind_cell){

    if(to_Cell.number.className === 'number') {
        grid.gridElement.removeChild(to_Cell.number);
        Hero.number -= +to_Cell.number.dataset.value;
        from_Cell.number.lastElementChild.lastElementChild.innerText = Hero.number;
    } else if(to_Cell.number.className === 'heal') {
        grid.gridElement.removeChild(to_Cell.number);
        if (Hero.number < 10) {
            let lackHealth = (10 - Hero.number);
            if (to_Cell.number.dataset.value <= lackHealth){
                Hero.number += +to_Cell.number.dataset.value;
                from_Cell.number.lastElementChild.lastElementChild.innerText = Hero.number;
            } else {
                let remainsHealth = to_Cell.number.dataset.value - lackHealth;
                Hero.number += +to_Cell.number.dataset.value - remainsHealth;
                from_Cell.number.lastElementChild.lastElementChild.innerText = Hero.number;
            }
        }
    }

    from_Cell.number.style.top = `${to_Cell.top}px`;
    from_Cell.number.style.left = `${to_Cell.left}px`;

    to_Cell.number = from_Cell.number;
    Hero.cell_number = to_Cell.cell_number;

    behind_cell.number.style.top = `${from_Cell.top}px`;
    behind_cell.number.style.left = `${from_Cell.left}px`;

    from_Cell.number = behind_cell.number;
    behind_cell.number = null;

    if (two_behind_cell) {
        two_behind_cell.number.style.top = `${behind_cell.top}px`;
        two_behind_cell.number.style.left = `${behind_cell.left}px`;

        behind_cell.number = two_behind_cell.number;
        two_behind_cell.number = null;
    }
};

export {Hero, moveToCell}