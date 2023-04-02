import {Item} from './item.js'

// класс меча
export class Sword extends Item {
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