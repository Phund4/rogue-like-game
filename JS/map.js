import {Helper} from './helpers.js'

// класс карты
export class Map extends Helper {

    // инициализация карты
    init() {
        this.wallFillField();
        this.roomFillField();
        this.corridorVertFillFilled();
        this.corridorHorFillFilled();
    }

    // замена стены полом
    fromWallToFloor(i, j) {
        let cell = this.field.querySelector(`.r${i}c${j}`)
        cell.classList.remove('tileW');
        cell.classList.add('tile');
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
                    if (el.classList.contains('tile')) {
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