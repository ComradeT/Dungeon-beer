import grid from './grid.js';

const number = {
    spawnCard: function() {
        function randomInteger(min, max) {
            // случайное число от min до (max+1)
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        let randomNumber = randomInteger(1, 100);

        if (randomNumber >= 40) {
            this.spawn();
        } else {
            this.spawnHeal();
        }

    },
    spawn: function() {
        const emptyCellIndex = grid.randomEmptyCellIndex(); //случайное число от 1-9 либо false

        if(emptyCellIndex === false) {
            return false;
        }
        
        const numberElement = document.createElement("div");
        const numberValue = 2;

        numberElement.innerText = numberValue;
        numberElement.dataset.value = numberValue; //пригодиться для сложения чисел
        numberElement.classList.add("number");

        numberElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        numberElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

        grid.cells[emptyCellIndex].number = numberElement;

        grid.gridElement.append(numberElement);
        
        return true;
    },
    spawnHeal: function() {
        const emptyCellIndex = grid.randomEmptyCellIndex(); //случайное число от 1-9 либо false

        if(emptyCellIndex === false) {
            return false;
        }
        
        const healElement = document.createElement("div");
        const numberValue = 2;

        healElement.innerText = numberValue;
        healElement.dataset.value = numberValue; //пригодиться для сложения чисел
        healElement.classList.add("heal");

        healElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        healElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

        grid.cells[emptyCellIndex].number = healElement;

        grid.gridElement.append(healElement);
        
        return true;
    },
 }

export default number;