import {Item} from './item.js'

// класс зелья со здоровьем
export class Heal extends Item {
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