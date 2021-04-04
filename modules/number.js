import grid from './grid.js';

const number = {
    randomValue: function(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    spawnCard: function() {

        let randomNumber = this.randomValue(1, 100);

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
        
        let randomHealth = this.randomValue(2, 5);

        const numberElement = document.createElement("div");
        const numberValue = randomHealth;

        numberElement.dataset.value = numberValue; //пригодиться для сложения чисел
        numberElement.classList.add("number");

        numberElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        numberElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

        grid.cells[emptyCellIndex].number = numberElement;

        const cardWapper = document.createElement('div');
        cardWapper.classList.add("card__wrapper");
        numberElement.append(cardWapper);

        const healthValue =  document.createElement('div');
        healthValue.classList.add("card__health");
        cardWapper.append(healthValue);
        healthValue.innerText = numberValue;

        grid.gridElement.append(numberElement);
        
        return true;
    },
    spawnHeal: function() {
        const emptyCellIndex = grid.randomEmptyCellIndex(); //случайное число от 1-9 либо false

        if(emptyCellIndex === false) {
            return false;
        }
        
        let randomHealth = this.randomValue(2, 8);

        const healElement = document.createElement("div");
        const numberValue = randomHealth;

        healElement.dataset.value = numberValue; //пригодиться для сложения чисел
        healElement.classList.add("heal");

        healElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        healElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

        grid.cells[emptyCellIndex].number = healElement;

        const cardWapper = document.createElement('div');
        cardWapper.classList.add("card__wrapper");
        healElement.append(cardWapper);

        const healthValue =  document.createElement('div');
        healthValue.classList.add("card__health");
        cardWapper.append(healthValue);
        healthValue.innerText = numberValue;

        grid.gridElement.append(healElement);
        
        return true;
    },
 }

export default number;