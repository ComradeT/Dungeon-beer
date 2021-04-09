import grid from './grid.js';

const number = {
    randomValue: function(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    spawnCard: function() {

        let randomNumber = this.randomValue(1, 100);

        if(randomNumber <= 20) {
            this.spawnCoin();
        } else if(randomNumber <= 30) {
            this.spawnPoison();
        } else if (randomNumber <= 40){
            this.spawnWeapon();
        } else if (randomNumber <= 60) {
            this.spawnHeal();
        } else if (randomNumber >= 80) {
            this.spawn();
        } else if (randomNumber >= 70) {
            this.spawnGhost();
        }else if (randomNumber >= 60) {
            this.spawnIceGiant();
        }

    },
    createCard: function(randomHealth, elementClass, valueOrHealth) {
        const emptyCellIndex = grid.randomEmptyCellIndex();

        if(emptyCellIndex === false) {
            return false;
        }

        const numberElement = document.createElement("div");
        const numberValue = randomHealth;

        numberElement.dataset.value = numberValue; 
        numberElement.classList.add(`${elementClass}`);

        numberElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
        numberElement.style.left = `${grid.cells[emptyCellIndex].left}px`;
        numberElement.classList.add('card_rotate');
        

        grid.cells[emptyCellIndex].number = numberElement;

        const cardWapper = document.createElement('div');
        cardWapper.classList.add("card__wrapper");
        numberElement.append(cardWapper);

        const healthValue =  document.createElement('div');
        healthValue.classList.add(`${valueOrHealth}`);
        cardWapper.append(healthValue);
        healthValue.innerText = numberValue;

        grid.gridElement.append(numberElement);

        setTimeout (function() {
            numberElement.classList.add('card_rotate0');
            numberElement.classList.remove('card_rotate');
            numberElement.classList.remove('card_rotate0');
        }, 100);
    },
    spawn: function() {
        let randomHealth = this.randomValue(2, 4);
        let elementClass = 'number';
        let valueOrHealth = 'health';

        this.createCard(randomHealth, elementClass, valueOrHealth);
        
        return true;
    },
    spawnGhost: function() {
        let randomHealth = this.randomValue(2, 5);
        let elementClass = 'ghost';
        let valueOrHealth = 'health';

        this.createCard(randomHealth, elementClass, valueOrHealth);
        
        return true;
    },
    spawnIceGiant: function(){
        let randomHealth = this.randomValue(4, 7);
        let elementClass = 'giant';
        let valueOrHealth = 'health';

        this.createCard(randomHealth, elementClass, valueOrHealth);

        let anyCellIndex = grid.randomCellIndex();
        let numberElement = grid.cells[anyCellIndex].number;
        grid.gridElement.removeChild(numberElement);
        grid.cells[anyCellIndex].number = null;

        number.spawnMountain();
        return true;
    },
    spawnMountain: function(){
        let randomHealth = 1;
        let elementClass = 'mountain';
        let valueOrHealth = 'value';

        this.createCard(randomHealth, elementClass, valueOrHealth);
        
        return true;
    },
    spawnYety: function() {
        let randomHealth = this.randomValue(2, 6);
        let elementClass = 'yeti';
        let valueOrHealth = 'health';

        this.createCard(randomHealth, elementClass, valueOrHealth);
        
        return true;
    },
    spawnHeal: function() {
        let randomHealth = this.randomValue(2, 8);
        let elementClass = 'heal';
        let valueOrHealth = 'value';
        
        this.createCard(randomHealth, elementClass, valueOrHealth);

        return true;
    },
    spawnWeapon: function() {
        let randomHealth = this.randomValue(2, 8);
        let elementClass = 'weapon';
        let valueOrHealth = 'value';
        
        this.createCard(randomHealth, elementClass, valueOrHealth);

        return true;
    },
    spawnCoin: function() {
        let randomHealth = 1;
        let elementClass = 'coin';
        let valueOrHealth = 'value';
        this.createCard(randomHealth, elementClass, valueOrHealth);
        return true;
    },
    spawnPoison: function() {
        let randomHealth = 1;
        let elementClass = 'poison';
        let valueOrHealth = 'value';
        this.createCard(randomHealth, elementClass, valueOrHealth);
        return true;
    },
 }

export default number;