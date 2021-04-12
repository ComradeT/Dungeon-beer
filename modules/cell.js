import grid from './grid.js';
import number from './number.js';

let Hero = {
    number: 10,
    cell_number: null,
    attack: 0,
    gold: 0,
    poisoned: false,
    movement: true,

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
        healthValue.classList.add("health");
        cardWapper.append(healthValue);
        healthValue.innerText = this.number;

        const attackValue = document.createElement('div');
        attackValue.classList.add("attack");
        cardWapper.append(attackValue);
        attackValue.innerText = this.attack;

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
    if (Hero.movement === true) {
        setTimeout(function() {
            number.spawnCard();
            if(grid.checkGameOver()) {
                let modal = document.querySelector('.modalGameOver');
                modal.style.visibility = 'visible';
            } else {
                grid.playable = true;
            };
        }, 500)
    }
};

function relocate(from_Cell, to_Cell, behind_cell, two_behind_cell){
    let toCellValue = to_Cell.number.dataset.value;
    let toCellClass = to_Cell.number.className;
    let eqouipWeapon = document.createElement('div');
        eqouipWeapon.classList.add("weapon_equip");

    if(toCellClass === 'number' || toCellClass === 'ghost' || toCellClass === 'giant' || toCellClass === 'yeti') {
        if (toCellClass === 'ghost' && to_Cell.disembodied === true){
            let fromPosTop = from_Cell.top;
            let fromPosLeft = from_Cell.left;
            let toCellDiv = to_Cell.number;
            from_Cell.number.style.top = `${to_Cell.top}px`;
            from_Cell.number.style.left = `${to_Cell.left}px`;

            to_Cell.number.style.top = `${fromPosTop}px`;
            to_Cell.number.style.left = `${fromPosLeft}px`;
            Hero.cell_number = to_Cell.cell_number;
            to_Cell.number = from_Cell.number;
            from_Cell.number = toCellDiv;

            to_Cell.disembodied = false;
            from_Cell.number.childNodes[0].childNodes[0].style.opacity = '1';
            from_Cell.number.style.opacity = '1';
            return;
        } else if(Hero.attack > 0){
            if(Hero.attack < toCellValue){
                from_Cell.number.childNodes[0].childNodes[2].remove();
                to_Cell.number.childNodes[0].classList.add('slash_attack');
                to_Cell.number.style.transform = 'scale(0.9)';
                toCellValue -= Hero.attack;
                to_Cell.number.childNodes[0].childNodes[0].innerText = toCellValue;
                to_Cell.number.dataset.value = toCellValue;
                Hero.attack -= Hero.attack;
                from_Cell.number.childNodes[0].childNodes[1].innerText = Hero.attack;
                if (toCellClass === 'ghost') {
                    to_Cell.disembodied = true;
                    to_Cell.number.childNodes[0].childNodes[0].style.opacity = '0';
                    to_Cell.number.style.opacity = '0.5';
                }
                setTimeout(function() {
                    to_Cell.number.style.transform = 'scale(1)';
                    to_Cell.number.childNodes[0].classList.remove('slash_attack');
                }, 200);
                stepFinish();
                return;
            } else if(Hero.attack >= toCellValue) {
                to_Cell.number.childNodes[0].classList.add('slash_attack');
                to_Cell.number.style.transform = 'scale(0.9)';
                Hero.attack -= +toCellValue;
                from_Cell.number.childNodes[0].childNodes[1].innerText = Hero.attack;
                to_Cell.number.classList.add('card_rotate');
                if(Hero.attack == 0) {
                    from_Cell.number.childNodes[0].childNodes[2].remove();
                }
                setTimeout (function() {
                    grid.gridElement.removeChild(to_Cell.number);
                    to_Cell.number = null;
                    number.spawnCoin();
                    stepFinish();
                }, 100);
                setTimeout(function() {
                    to_Cell.number.style.transform = 'scale(1)';
                    to_Cell.number.childNodes[0].classList.remove('slash_attack');
                }, 200);
                return false;
            }
        } else{
            Hero.number -= +toCellValue;
            from_Cell.number.childNodes[0].childNodes[0].innerText = Hero.number;
        }
    } else if(toCellClass === 'heal') {
        Hero.poisoned = false;
        if (Hero.number < from_Cell.number.dataset.value) {
            let lackHealth = (from_Cell.number.dataset.value - Hero.number);
            if (toCellValue <= lackHealth){
                Hero.number += +toCellValue;
                from_Cell.number.childNodes[0].childNodes[0].innerText = Hero.number;
            } else {
                let remainsHealth = toCellValue - lackHealth;
                Hero.number += +toCellValue - remainsHealth;
                from_Cell.number.childNodes[0].childNodes[0].innerText = Hero.number;
            }
        }
    } else if(toCellClass === 'weapon') {
        if (Hero.attack < toCellValue) {
            Hero.attack = +toCellValue;
            from_Cell.number.childNodes[0].childNodes[1].innerText = Hero.attack;
            from_Cell.number.childNodes[0].append(eqouipWeapon);
        }
    } else if(toCellClass === 'coin') {
        let goldPanel = document.querySelector('.gold');
        Hero.gold += +toCellValue;
        goldPanel.innerText = Hero.gold;
    } else if(toCellClass === 'poison'){
        Hero.poisoned = true;
    } else if(toCellClass === 'mountain'){
        to_Cell.number.classList.add('card_rotate');
        setTimeout (function() {
            grid.gridElement.removeChild(to_Cell.number);
            to_Cell.number = null;
            let randomNumber = number.randomValue(1, 100);
            if (randomNumber >= 50) {
                number.spawnYety();
            } else{
                number.spawnCoin();
            }
            Hero.movement = true;
            stepFinish();
        }, 100);
        Hero.movement = false;
        grid.playable = true;
        return false;
    }

    stepFinish();
    to_Cell.number.classList.add('card_scale');
    
    setTimeout(function() {
        to_Cell.number.classList.remove('card_scale');
        grid.gridElement.removeChild(to_Cell.number);

        from_Cell.number.style.top = `${to_Cell.top}px`;
        from_Cell.number.style.left = `${to_Cell.left}px`;

        to_Cell.number = from_Cell.number;
        Hero.cell_number = to_Cell.cell_number;
    }, 150);
    setTimeout(function() {
        if (behind_cell.number.className === 'ghost' && behind_cell.disembodied === true) {
            behind_cell.number.style.top = `${from_Cell.top}px`;
            behind_cell.number.style.left = `${from_Cell.left}px`;
            from_Cell.disembodied = true;
            behind_cell.disembodied = false;
        } else {
            behind_cell.number.style.top = `${from_Cell.top}px`;
            behind_cell.number.style.left = `${from_Cell.left}px`;
        }

        from_Cell.number = behind_cell.number;
        behind_cell.number = null;

        if (two_behind_cell) {
            two_behind_cell.number.style.top = `${behind_cell.top}px`;
            two_behind_cell.number.style.left = `${behind_cell.left}px`;

            behind_cell.number = two_behind_cell.number;
            two_behind_cell.number = null;
        }
    }, 300)
    Hero.movement = true;
};

function stepFinish() {
    let heroValue = document.querySelector('.health');
    let heroWrapper = document.querySelector('.card__wrapper');
    if(Hero.poisoned === true) {
        if (Hero.number > 1){
            Hero.number -= 1;
            heroWrapper.classList.add('poisoned');
        } else {
            heroWrapper.classList.remove('poisoned');
        }
        heroValue.innerText = Hero.number;
    } else {
        heroWrapper.classList.remove('poisoned');
    }
}


export {Hero, moveToCell}