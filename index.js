// класс с общими параметрами и функциями
class Helper {
    width = 30;
    height = 20;
    field = document.querySelector('.field');
    tiles = this.field?.getElementsByClassName('tile');

    // получение рандомного числа
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// общий класс для предметов
class Item extends Helper {
    static swordArr = [];
    static healArr = [];
}

// общий класс для персонажей
class Unit extends Helper {
    static enemyArr = [];
    static heroArr = [];
    unit = document.createElement('div');
    hp = document.createElement('div');
    damage = 0;
    health = 100;

    // инициализация полоски здоровья
    inithp() {
        this.hp.classList.add('health');
        this.hp.style.width = '100%';
        this.hp.style.backgroundSize = '100%';
        this.unit.appendChild(this.hp);
    }

    // перемещение на клетку вверх
    runW() {
        let [rowStart, colStart, rowEnd, colEnd] = this.unit.style.gridArea.split(' / ');
        let upEl = this.field.querySelector(`.r${rowStart - 2}c${colStart - 1}`);
        if (rowStart >= 2 && !upEl.classList.contains('tileW')) {
            this.unit.style.gridRowStart = (parseInt(rowStart) - 1).toString();
            this.unit.style.gridRowEnd = (parseInt(rowEnd) - 1).toString();
        }
    }

    // перемещение на клетку влево
    runA() {
        let [rowStart, colStart, rowEnd, colEnd] = this.unit.style.gridArea.split(' / ');
        let leftEl = this.field.querySelector(`.r${rowStart - 1}c${colStart - 2}`);
        if (colStart >= 2 && !leftEl.classList.contains('tileW')) {
            this.unit.style.gridColumnStart = (parseInt(colStart) - 1).toString();
            this.unit.style.gridColumnEnd = (parseInt(colEnd) - 1).toString();
        }
    }

    // перемещение на клетку вниз
    runS() {
        let [rowStart, colStart, rowEnd, colEnd] = this.unit.style.gridArea.split(' / ');
        let downEl = this.field.querySelector(`.r${rowEnd - 1}c${colStart - 1}`);
        if (rowEnd <= this.height && !downEl.classList.contains('tileW')) {
            this.unit.style.gridRowStart = (parseInt(rowStart) + 1).toString();
            this.unit.style.gridRowEnd = (parseInt(rowEnd) + 1).toString();
        }
    }

    // перемещение на клетку вправо
    runD() {
        let [rowStart, colStart, rowEnd, colEnd] = this.unit.style.gridArea.split(' / ');
        let rightEl = this.field.querySelector(`.r${rowStart - 1}c${colEnd - 1}`);
        if (colEnd <= this.width && !rightEl.classList.contains('tileW')) {
            this.unit.style.gridColumnStart = (parseInt(colStart) + 1).toString();
            this.unit.style.gridColumnEnd = (parseInt(colEnd) + 1).toString();
        }
    }
}

// класс меча
class Sword extends Item {
    // инициализация меча
    init() {
        const randCell = this.getRandom(0, this.tiles.length - 1);
        let sword = document.createElement('div');
        sword.style.gridArea = this.tiles[randCell].style.gridArea; 
        sword.style.backgroundSize = '100%';
        sword.classList.add('tileSW');
        this.field.appendChild(sword);
    }
}

// класс карты
class Map extends Helper {

    // инициализация карты
    init() {
        this.wallFillField();
        this.roomFillField();
        this.corridorVertFillFilled();
        this.corridorHorFillFilled();
    }

    // замена стены полом
    fromWallToFloor(i, j) {
        let cell = this.field?.querySelector(`.r${i}c${j}`)
        cell?.classList.remove('tileW');
        cell?.classList.add('tile');
    }

    // покрытие стеной всей карты
    wallFillField() {
        for (let i=0; i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                let div = document.createElement('div');
                div.classList.add('tileW', `r${i}c${j}`);
                div.style.gridArea = `${i+1} / ${j+1} / ${i+2} / ${j+2}`;
                this.field?.appendChild(div);
            }
        }
    }

    // генерация комнат
    roomFillField() {
        const countRoom = this.getRandom(5, 10);
        for(let c=0; c<countRoom; c++) {
            const roomWidth = this.getRandom(3, 8);
            const roomHeight = this.getRandom(3, 8);
            const coordRoom = [this.getRandom(0, this.width - roomWidth), 
                this.getRandom(0, this.height - roomHeight)];
            for(let i=coordRoom[1]; i < coordRoom[1] + roomHeight; i++) {
                for(let j=coordRoom[0]; j < coordRoom[0] + roomWidth; j++) {
                    this.fromWallToFloor(i, j);
                }
            }
        }
    }

    // генерация вертикальных коридоров
    corridorVertFillFilled () {
        const countVertCorr = this.getRandom(3, 5);
        for (let c = 0; c < countVertCorr; c++) {
            let isCorridor = false;
            let randColumn = 0;
            while(!isCorridor) {
                randColumn = this.getRandom(0, this.width - 1);
                for(let i=0; i<this.height; i++) {
                    const el = this.field?.querySelector(`.r${i}c${randColumn}`)
                    if (el?.classList.contains('tile')) {
                        isCorridor = true;
                    }
                }
            }
            for(let i=0; i<this.height; i++) {
                this.fromWallToFloor(i, randColumn)
            }
        }
    }

    // генерация горизонтальных коридоров
    corridorHorFillFilled () {
        const countHorCorr = this.getRandom(3, 5);
        for (let c = 0; c < countHorCorr; c++) {
            let isCorridor = false;
            let randRow = 0;
            while(!isCorridor) {
                randRow = this.getRandom(0, this.height - 1);
                for(let i=0; i<this.width; i++) {
                    const el = this.field?.querySelector(`.r${randRow}c${i}`)
                    if (el.classList.contains('tile')) {
                        isCorridor = true;
                    }
                }
            }
            for(let i=0; i<this.width; i++) {
                this.fromWallToFloor(randRow, i);
            }
        }
    }
}

// класс героя
class Hero extends Unit {
    // инициализация героя
    init() {
        const randCell = this.getRandom(0, this.tiles.length - 1);
        let hero = this.unit;
        hero.style.gridArea = this.tiles[randCell].style.gridArea;
        hero.style.backgroundSize = '100%';
        hero.classList.add('tileP');
        document.addEventListener('keydown', this.canDamageHandler)
        this.damage = 30;
        this.field.appendChild(hero);
        this.inithp();
        this.run();
    }

    // получение зелья
    takeHeal() {
        let heroRowStart = this.unit.style.gridRowStart;
        let heroColStart = this.unit.style.gridColumnStart;
        let arrHP = this.field.getElementsByClassName('tileHP');
        for (let i = 0; i < arrHP.length; i++) {
            let heal = arrHP.item(i);
            let [healRowStart, healColStart, ...params] = heal.style.gridArea.split(' / ');
            if (healRowStart == heroRowStart && healColStart == heroColStart && this.health < 100) {
                this.unit.childNodes[0].style.width = `${(this.health + 50 > 100 ? 100 : this.health + 50)}%`
                this.health = (this.health + 50 > 100 ? 100 : this.health + 50);
                document.querySelector('.inventory').appendChild(heal);
            }
        }
    }

    // получение меча
    takeSword() {
        let heroRowStart = this.unit.style.gridRowStart;
        let heroColStart = this.unit.style.gridColumnStart;
        let arrSword = this.field.getElementsByClassName('tileSW');
        for (let i = 0; i < arrSword.length; i++) {
            let sword= arrSword.item(i);
            let [swordRowStart, swordColStart, ...params] = sword.style.gridArea.split(' / ');
            if (swordRowStart == heroRowStart && swordColStart == heroColStart) {
                this.damage += 10;
                document.querySelector('.inventory').appendChild(sword);
            }
        }
    }

    // активация бега
    run() {
        document.addEventListener('keydown', (event) => { 
            switch (event.code) {
                case 'KeyW':
                    {
                        this.runW();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
                case 'KeyA':
                    {
                        this.runA();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
                case 'KeyS':
                    {
                        this.runS();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
                case 'KeyD':
                    {
                        this.runD();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
            }
        })
    }

    // логика атаки
    canDamageHandler = (event) => {
        if (event.code == 'Space') {
            event.preventDefault();
            let [rowStart, colStart, ...params1] = this.unit.style.gridArea.split(' / ');
            let enemies = Unit.enemyArr;
            enemies.map(enemy => {
                let [enemyRowStart, enemyColStart, ...params2] = enemy.unit.style.gridArea.split(' / ');
                if (Math.abs(rowStart - enemyRowStart) <= 1 && Math.abs(colStart - enemyColStart) <= 1) {
                    enemy.unit.childNodes[0].style.width = `${enemy.health - this.damage}%`;
                    enemy.health -= this.damage;
                }
                if (enemy.health <= 0) {
                    this.field.removeChild(enemy.unit);
                    enemies.splice(enemies.indexOf(enemy), 1);
                    clearInterval(enemy.damageInterval);
                    clearInterval(enemy.runInterval);
                }
            })
            if(!enemies.length) {
                alert('you win');
            }
        }
    }
}

// класс зелья со здоровьем
class Heal extends Item {
    // инициализация зелья со здоровьем
    init() {
        const randCell = this.getRandom(0, this.tiles.length - 1);
        let heal = document.createElement('div');
        heal.style.gridArea = this.tiles[randCell].style.gridArea; 
        heal.style.backgroundSize = '100%';
        heal.classList.add('tileHP');
        this.field.appendChild(heal);
    }
}

// класс врага
class Enemy extends Unit {
    runInterval = 0;
    damageInterval = 0;

    // инициализация врага
    init() {
        const randCell = this.getRandom(0, this.tiles.length - 1);
        let enemy = this.unit;
        enemy.style.gridArea = this.tiles[randCell].style.gridArea; 
        enemy.style.backgroundSize = '100%';
        enemy.classList.add('tileE');
        this.damage = 20;
        this.field.appendChild(enemy);
        this.inithp();
        this.run();
        setTimeout(() => this.canDamage(), 2000);
    }

    // активация бега
    run() {
        this.runInterval = setInterval(() => {
            const randWay = this.getRandom(0, 3);
            if (randWay == 0) this.runW();
            else if (randWay == 1) this.runA();
            else if (randWay == 2) this.runS();
            else if (randWay == 3) this.runD();
        }, 1000)
    }

    // логика атаки
    canDamageHandler = () => {
        let [rowStart, colStart, ...params1] = this.unit.style.gridArea.split(' / ');
        let heroes = Unit.heroArr;
        for(let i=0; i<heroes.length; i++) {
            let hero = heroes[i];
            let [heroRowStart, heroColStart, ...params2] = hero.unit.style.gridArea.split(' / ');
            if (Math.abs(rowStart - heroRowStart) <= 1 && Math.abs(colStart - heroColStart) <= 1) {
                if (this.runInterval) {
                    clearInterval(this.runInterval);
                    this.runInterval = 0;
                }
                hero.unit.childNodes[0].style.width = `${hero.health - this.damage}%`;
                hero.health -= this.damage;
            }
            else if (!this.runInterval) {
                this.run();
            }
            if (hero.health <= 0) {
                this.field.removeChild(hero.unit);
                heroes.splice(heroes.indexOf(hero), 1);
                document.removeEventListener('keydown', hero.canDamageHandler);
                this.run();
                if(heroes.length == 0) {
                    alert('game over');
                }
            }
        }
    }

    // активация атаки
    canDamage() {
        this.damageInterval = setInterval(this.canDamageHandler, 250);
    }
}

// класс игры
class Game extends Helper {
    // логика перезапуска игры
    restart() {
        const buttonRestart = document.querySelector('.restart');
        buttonRestart.addEventListener('click', () => {
            window.location.reload();
        })
        window.addEventListener('keydown', (event) => {
            if (event.code == 'Enter') window.location.reload();
        })
    }
    
    // отрисовка персонажей
    renderUnits() {
        const hero = new Hero();
        hero.init();
        Unit.heroArr.push(hero);
        for(let i=0; i<10; i++) {
            const enemy = new Enemy();
            enemy.init();
            Unit.enemyArr.push(enemy);
        }
    }

    // отрисовка предметов
    renderItems() {
        for(let i=0; i<2; i++) {
            const sword = new Sword();
            sword.init();
            Item.swordArr.push(sword);
        }
        for (let i=0; i<10; i++) {
            const heal = new Heal();
            heal.init();
            Item.healArr.push(heal);
        }
    }

    // инициализация игры
    init () {
        const map = new Map();
        map.init();
        this.renderUnits();
        this.renderItems();
        this.restart();
    }
}
