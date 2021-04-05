import grid from './grid.js';

const number = {
    randomValue: function(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    spawnCard: function() {

        let randomNumber = this.randomValue(1, 100);

        if (randomNumber >= 50) {
            this.spawn();
        } else if(randomNumber <= 20) {
            this.spawnWeapon();
        } else if (randomNumber <= 50){
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
        healthValue.classList.add("health");
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
        healthValue.classList.add("health");
        cardWapper.append(healthValue);
        healthValue.innerText = numberValue;

        grid.gridElement.append(healElement);
        
        return true;
    },
    spawnWeapon: function() {
        const emptyCellIndex = grid.randomEmptyCellIndex(); //случайное число от 1-9 либо false

        if(emptyCellIndex === false) {
            return false;
        }
        
        let randomWeapon = this.randomValue(2, 8);

        const weaponElement = document.createElement("div");
        const numberValue = randomWeapon;

        weaponElement.dataset.value = numberValue; 
        weaponElement.classList.add("weapon");

        weaponElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        weaponElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

        grid.cells[emptyCellIndex].number = weaponElement;

        const cardWapper = document.createElement('div');
        cardWapper.classList.add("card__wrapper");
        weaponElement.append(cardWapper);

        const healthValue =  document.createElement('div');
        healthValue.classList.add("health");
        cardWapper.append(healthValue);
        healthValue.innerText = numberValue;

        grid.gridElement.append(weaponElement);
        
        return true;
    },
 }

export default number;