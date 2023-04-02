import {Helper} from './helpers.js'

// общий класс для персонажей
export class Unit extends Helper {
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