import {Enemy} from './enemy.js'
import {Heal} from './heal.js'
import {Hero} from './hero.js'
import {Map} from './map.js'
import {Sword} from './sword.js'
import {Helper} from './helpers.js'
import {Unit} from './unit.js'
import {Item} from './item.js'

// класс игры
export class Game extends Helper {
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