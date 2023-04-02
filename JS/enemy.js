import {Unit} from './unit.js'

// класс врага
export class Enemy extends Unit {
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
